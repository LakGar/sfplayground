(() => {
  'use strict';
  const config = window.SFPLAYGROUND_MEDIA;
  if (!config) return;
  const tour = document.getElementById('tour');
  const screen = document.querySelector('.screen');
  const video = document.getElementById('film');
  const poster = document.querySelector('.poster');
  const copies = [...document.querySelectorAll('.copy')];
  const buttons = [...document.querySelectorAll('.chapter')];
  const motionButton = document.querySelector('.motion-toggle');
  const progressBar = document.getElementById('progress');
  const sceneNumber = document.getElementById('scene-number');
  const sceneName = document.getElementById('scene-name');
  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  const frameDuration = 1 / config.fps;
  const lastTime = (config.frameCount - 1) / config.fps;
  const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
  const quantize = time => clamp(Math.round(time * config.fps) / config.fps, 0, lastTime);
  let reduced = motionPreference.matches;
  let started = false, hls = null, fallback = false, awaitingResume = true;
  let activeScene = -1, targetTime = 0, displayedTime = 0, easedTime = 0;
  let tourStart = 0, travel = 1, inView = true, raf = 0, lastTick = 0;
  let seeking = false, seekStarted = 0, issuedTime = 0, seekSerial = 0;
  let seekCount = 0, seekTotal = 0, seekMax = 0, committed = 0;
  let startClock = 0, firstFrame = false, recoveryTimer = 0;

  function updateScene(index) {
    if (index === activeScene) return;
    activeScene = index;
    copies.forEach((copy, i) => {
      const active = i === index;
      copy.classList.toggle('active', active);
      copy.setAttribute('aria-hidden', String(!active));
      copy.inert = !active;
    });
    buttons.forEach((button, i) => {
      button.classList.toggle('active', i === index);
      if (i === index) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
    sceneNumber.textContent = String(index + 1).padStart(2, '0');
    sceneName.textContent = config.names[index];
  }
  function chapterAt(time) {
    const frame = Math.round(time * config.fps);
    return config.scenePositions.reduce((last, point, i) => frame >= Math.round(point * (config.frameCount - 1)) ? i : last, 0);
  }
  function measure() {
    tourStart = window.scrollY + tour.getBoundingClientRect().top;
    travel = Math.max(1, tour.offsetHeight - screen.clientHeight);
    screen.classList.toggle('contain-scene', screen.clientWidth / screen.clientHeight < .9);
    readScroll();
  }
  function readScroll() {
    const progress = clamp((window.scrollY - tourStart) / travel, 0, 1);
    targetTime = quantize(progress * lastTime);
    inView = window.scrollY + screen.clientHeight >= tourStart && window.scrollY <= tourStart + tour.offsetHeight;
    progressBar.style.transform = `scaleX(${progress})`;
    video.dataset.targetTime = targetTime.toFixed(3);
    if (reduced) showStill(chapterAt(targetTime));
    else requestTick();
  }
  function showStill(index) {
    const path = config.sceneStillPaths[index];
    if (poster.getAttribute('src') === path && poster.complete) { updateScene(index); return; }
    poster.onload = () => { if (reduced && poster.getAttribute('src') === path) updateScene(index); };
    poster.src = path;
  }
  function presented(time, source = 'frame-callback') {
    displayedTime = quantize(time);
    video.dataset.frame = String(Math.round(displayedTime * config.fps));
    video.dataset.displayedTime = displayedTime.toFixed(3);
    video.dataset.resolution = `${video.videoWidth}x${video.videoHeight}`;
    video.dataset.visibility = document.visibilityState;
    video.dataset.commitSource = source;
    if (!firstFrame) {
      firstFrame = true;
      video.dataset.firstFrameMs = String(Math.round(performance.now() - startClock));
    }
    if (!awaitingResume || Math.abs(displayedTime - targetTime) <= frameDuration * 1.5) {
      awaitingResume = false;
      video.classList.add('ready');
      if (!reduced) updateScene(chapterAt(displayedTime));
    }
    if (seeking && Math.abs(displayedTime - issuedTime) <= frameDuration * 1.5) {
      const elapsed = performance.now() - seekStarted;
      committed++; seekTotal += elapsed; seekMax = Math.max(seekMax, elapsed);
      video.dataset.seekMeanMs = String(Math.round(seekTotal / committed));
      video.dataset.seekMaxMs = String(Math.round(seekMax));
      video.dataset.committedSeeks = String(committed);
      const recent = JSON.parse(video.dataset.recentSeekMs || '[]'); recent.push(Math.round(elapsed));
      video.dataset.recentSeekMs = JSON.stringify(recent.slice(-30));
      seeking = false;
    }
    requestTick();
  }
  const supportsFrameCallback = typeof video.requestVideoFrameCallback === 'function';
  function onVideoFrame(_now, metadata) {
    presented(metadata.mediaTime);
    video.requestVideoFrameCallback(onVideoFrame);
  }
  if (supportsFrameCallback) video.requestVideoFrameCallback(onVideoFrame);
  video.addEventListener('loadeddata', () => { presented(video.currentTime, 'loaded-data'); requestTick(); });
  video.addEventListener('loadedmetadata', requestTick);
  video.addEventListener('canplay', requestTick);
  video.addEventListener('seeked', () => {
    if (!supportsFrameCallback) presented(video.currentTime, 'seeked');
    // Some engines do not issue frame callbacks for every paused seek.
    const serial = seekSerial;
    clearTimeout(recoveryTimer);
    recoveryTimer = setTimeout(() => {
      if (seeking && serial === seekSerial && !video.seeking) presented(video.currentTime, 'seeked-fallback');
    }, 90);
  });

  function useFallback() {
    if (fallback) { setReduced(true); return; }
    fallback = true; seeking = false; displayedTime = 0; easedTime = 0; clearTimeout(recoveryTimer);
    if (hls) { hls.destroy(); hls = null; }
    video.dataset.delivery = 'native-mp4';
    video.src = config.fallbackVideo;
    video.load();
  }
  function start() {
    if (started) return;
    started = true; startClock = performance.now();
    const mobile = matchMedia('(max-width: 600px)').matches;
    const source = mobile ? config.mobileStream : config.desktopStream;
    video.dataset.quality = mobile ? '1080p' : '1440p';
    video.muted = true;
    if (window.Hls?.isSupported()) {
      video.dataset.delivery = 'hls-mse';
      hls = new Hls({
        enableWorker: true,
        maxBufferLength: mobile ? 8 : 12,
        maxMaxBufferLength: mobile ? 12 : 16,
        backBufferLength: mobile ? 6 : 10,
        maxBufferSize: mobile ? 24 * 1024 * 1024 : 48 * 1024 * 1024,
        startFragPrefetch: true,
        startPosition: targetTime,
        capLevelToPlayerSize: false,
        debug: false
      });
      hls.on(Hls.Events.ERROR, (_event, data) => { if (data.fatal && !fallback) useFallback(); });
      hls.loadSource(source);
      hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.dataset.delivery = 'native-hls';
      video.src = source;
      video.load();
    } else useFallback();
  }
  video.addEventListener('error', () => { if (started && !reduced) useFallback(); });
  function requestTick() {
    if (!raf && !reduced && inView) raf = requestAnimationFrame(tick);
  }
  function bufferedAt(time) {
    if (!video.buffered) return false;
    for (let i = 0; i < video.buffered.length; i++) if (time >= video.buffered.start(i) && time < video.buffered.end(i) - .01) return true;
    return false;
  }
  function issueSeek(time) {
    seeking = true; seekStarted = performance.now(); issuedTime = time; seekSerial++;
    seekCount++; video.dataset.seekRequests = String(seekCount);
    video.currentTime = time;
  }
  function tick(now) {
    raf = 0;
    if (reduced || !inView) return;
    start();
    if (video.readyState < 1) { lastTick = now; return; }
    const dt = lastTick ? Math.min(now - lastTick, 100) : 16;
    lastTick = now;
    // Short easing absorbs wheel bursts without intercepting or replacing page scroll.
    const difference = targetTime - easedTime;
    // A distant cold jump loads its destination once, without downloading skipped intermediate chunks.
    const coldJump = Math.abs(targetTime - displayedTime) > 2 && !bufferedAt(targetTime);
    easedTime = coldJump || Math.abs(difference) < frameDuration ? targetTime : easedTime + difference * (1 - Math.exp(-dt / 85));
    const next = quantize(easedTime);
    if (!seeking && !video.seeking && Math.abs(next - displayedTime) >= frameDuration * .5) {
      issueSeek(next);
    }
    if (Math.abs(targetTime - displayedTime) >= frameDuration * .5 || seeking) requestTick();
  }
  function setReduced(value) {
    reduced = value;
    document.body.classList.toggle('low-motion', reduced);
    document.documentElement.classList.toggle('low-motion', reduced);
    motionButton.setAttribute('aria-pressed', String(reduced));
    motionButton.textContent = reduced ? 'Enable motion' : 'Reduce motion';
    if (reduced) {
      if (raf) cancelAnimationFrame(raf); raf = 0; video.pause();
      if (hls) hls.stopLoad(); showStill(chapterAt(targetTime));
    } else {
      // Keep the current still visible while motion resumes at the same scene.
      awaitingResume = true; video.classList.remove('ready');
      easedTime = targetTime; lastTick = 0; const resume = started; start();
      if (resume && hls) hls.startLoad(targetTime);
      if (resume && video.readyState >= 1) issueSeek(targetTime);
      requestTick();
    }
  }
  buttons.forEach((button, index) => button.addEventListener('click', () => {
    const position = index === 0 ? 0 : config.sceneFrames[index] / (config.frameCount - 1);
    window.scrollTo({ top: Math.ceil(tourStart + position * travel), behavior: reduced ? 'instant' : 'smooth' });
  }));
  motionButton.addEventListener('click', () => setReduced(!reduced));
  motionPreference.addEventListener('change', event => setReduced(event.matches));
  addEventListener('scroll', readScroll, { passive: true });
  addEventListener('resize', measure, { passive: true });
  addEventListener('pageshow', measure);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) { lastTick = 0; readScroll(); } });
  updateScene(0); measure(); setReduced(reduced);
})();
