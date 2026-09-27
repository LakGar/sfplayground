"use client";

import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Mail,
  Search,
  ShieldCheck,
  Sparkles,
  UserRoundPlus,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import {
  ClubExpert,
  IntroRequest,
  IntroStatus,
  clubExperts,
  clubMembers,
  demoMember,
  introRequests,
  introStatusLabels,
} from "@/data/silicon-valley-club";

type DashboardTab = "all" | "applied" | "accepted" | "completed" | "admin";

const tabs: { id: DashboardTab; label: string }[] = [
  { id: "all", label: "All people" },
  { id: "applied", label: "Applied to contact" },
  { id: "accepted", label: "Accepted intros" },
  { id: "completed", label: "Completed" },
  { id: "admin", label: "SFPG ops" },
];

const appliedStatuses: IntroStatus[] = ["requested", "contacted"];
const acceptedStatuses: IntroStatus[] = ["accepted", "intro_sent"];
const completedStatuses: IntroStatus[] = ["completed", "declined"];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function statusTone(status: IntroStatus) {
  if (status === "requested") return "bg-[#edf2ff] text-[#274690]";
  if (status === "contacted") return "bg-[#fff6df] text-[#8a5c00]";
  if (status === "accepted") return "bg-[#eaf8f1] text-[#126b43]";
  if (status === "intro_sent") return "bg-[#e8f7fb] text-[#036174]";
  if (status === "completed") return "bg-[#edf7ed] text-[#247237]";
  return "bg-[#f4eeee] text-[#8b2d2d]";
}

function findExpert(id: string) {
  return clubExperts.find((expert) => expert.id === id);
}

function findMember(id: string) {
  return clubMembers.find((member) => member.id === id);
}

export function PrivateClubDashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTab>("all");
  const [search, setSearch] = useState("");
  const [requests, setRequests] = useState<IntroRequest[]>(introRequests);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const memberRequests = requests.filter(
    (request) => request.memberId === demoMember.id,
  );

  const filteredExperts = useMemo(() => {
    const term = search.trim().toLowerCase();
    return clubExperts.filter((expert) => {
      const matchesCategory =
        selectedCategory === "All" || expert.category === selectedCategory;
      const matchesSearch =
        !term ||
        [expert.name, expert.title, expert.company, expert.description]
          .join(" ")
          .toLowerCase()
          .includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  const categoryOptions = [
    "All",
    ...Array.from(new Set(clubExperts.map((e) => e.category))),
  ];

  const activePipelineCount = memberRequests.filter((request) =>
    [...appliedStatuses, ...acceptedStatuses].includes(request.status),
  ).length;
  const acceptedCount = memberRequests.filter((request) =>
    acceptedStatuses.includes(request.status),
  ).length;
  const completedCount = memberRequests.filter((request) =>
    completedStatuses.includes(request.status),
  ).length;

  function requestIntro(expert: ClubExpert) {
    if (requests.some((request) => request.expertId === expert.id)) {
      setActiveTab("applied");
      return;
    }

    setRequests((current) => [
      {
        id: `req-${Date.now()}`,
        memberId: demoMember.id,
        expertId: expert.id,
        status: "requested",
        goal: `Requesting a warm intro to ${expert.name} for ${expert.tags[0].toLowerCase()} support.`,
        notes: "New member request. SFPG needs to review fit and contact the expert.",
        updatedAt: "Just now",
      },
      ...current,
    ]);
    setActiveTab("applied");
  }

  function updateStatus(requestId: string, status: IntroStatus) {
    setRequests((current) =>
      current.map((request) =>
        request.id === requestId
          ? {
              ...request,
              status,
              updatedAt: "Just now",
              notes:
                status === "intro_sent"
                  ? "Warm intro sent. Track reply and close the loop."
                  : request.notes,
            }
          : request,
      ),
    );
  }

  return (
    <main className="min-h-screen bg-[#f3f5f7] text-[#0c0f14]">
      <section className="mx-auto flex min-h-screen w-full max-w-[1600px] flex-col gap-3 p-2.5 pb-24 sm:p-4 md:gap-5 md:p-5 md:pb-5 xl:flex-row">
        <MobileHeader
          activePipelineCount={activePipelineCount}
          acceptedCount={acceptedCount}
          completedCount={completedCount}
        />

        <aside className="hidden rounded-[26px] bg-[#0c0f14] p-5 text-white shadow-[0_24px_70px_rgba(8,10,12,0.18)] xl:sticky xl:top-5 xl:flex xl:h-[calc(100vh-40px)] xl:w-[310px] xl:flex-col">
          <div className="flex items-center justify-between">
            <Link href="/silicon-valley" className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="SFPLAYGROUND"
                width={44}
                height={44}
                className="rounded-full"
              />
              <div>
                <p className="text-sm font-semibold">SFPLAYGROUND</p>
                <p className="text-xs text-white/52">Private Club</p>
              </div>
            </Link>
            <ShieldCheck className="size-5 text-white/55" />
          </div>

          <div className="mt-10">
            <Image
              src={demoMember.image}
              alt={demoMember.name}
              width={76}
              height={76}
              className="rounded-2xl object-cover"
            />
            <p className="mt-4 text-2xl font-semibold tracking-tight">
              {demoMember.name}
            </p>
            <p className="mt-1 text-sm text-white/55">
              {demoMember.title}, {demoMember.company}
            </p>
            <div className="mt-5 rounded-2xl bg-white/8 p-4 text-sm leading-6 text-white/68 ring-1 ring-white/10">
              {demoMember.lookingFor}
            </div>
          </div>

          <DesktopNav
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            appliedCount={
              memberRequests.filter((r) => appliedStatuses.includes(r.status))
                .length
            }
          />

          <div className="mt-8 grid grid-cols-3 gap-2">
            <MetricTile label="Active" value={activePipelineCount} dark />
            <MetricTile label="Accepted" value={acceptedCount} dark />
            <MetricTile label="Closed" value={completedCount} dark />
          </div>
        </aside>

        <div className="flex-1 space-y-3 md:space-y-5">
          <header className="overflow-hidden rounded-[24px] bg-white p-4 shadow-[0_18px_60px_rgba(8,10,12,0.06)] sm:rounded-[26px] md:p-7">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8b929d] sm:text-xs">
                  Silicon Valley Club
                </p>
                <h1 className="mt-3 max-w-4xl text-[2.15rem] font-semibold leading-[0.98] tracking-tight sm:text-5xl md:text-6xl">
                  Warm intros without chasing the room.
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-[#68717c] sm:text-base sm:leading-7">
                  Members request access to vetted VC speakers and experts.
                  SFPLAYGROUND reviews fit, contacts the expert, and manually
                  sends the intro when accepted.
                </p>
              </div>
              <div className="grid min-w-0 grid-cols-3 gap-2 lg:min-w-[260px]">
                <MetricTile label="Experts" value={clubExperts.length} />
                <MetricTile label="Members" value={clubMembers.length} />
                <MetricTile label="Requests" value={requests.length} />
              </div>
            </div>
          </header>

          <MobileTabBar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            appliedCount={
              memberRequests.filter((r) => appliedStatuses.includes(r.status))
                .length
            }
          />

          {activeTab === "all" ? (
            <AllPeopleView
              experts={filteredExperts}
              requests={memberRequests}
              search={search}
              setSearch={setSearch}
              categoryOptions={categoryOptions}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              onRequestIntro={requestIntro}
            />
          ) : null}

          {activeTab === "applied" ? (
            <RequestListView
              title="Applied to contact"
              description="These are waiting on SFPLAYGROUND review or expert response."
              requests={memberRequests.filter((request) =>
                appliedStatuses.includes(request.status),
              )}
            />
          ) : null}

          {activeTab === "accepted" ? (
            <RequestListView
              title="Accepted and in progress"
              description="The expert said yes. SFPLAYGROUND is sending or tracking the warm intro."
              requests={memberRequests.filter((request) =>
                acceptedStatuses.includes(request.status),
              )}
            />
          ) : null}

          {activeTab === "completed" ? (
            <RequestListView
              title="Completed or closed"
              description="Resolved requests, completed intros, and declined fits."
              requests={memberRequests.filter((request) =>
                completedStatuses.includes(request.status),
              )}
            />
          ) : null}

          {activeTab === "admin" ? (
            <AdminOpsView requests={requests} onUpdateStatus={updateStatus} />
          ) : null}
        </div>
      </section>
    </main>
  );
}

function MobileHeader({
  activePipelineCount,
  acceptedCount,
  completedCount,
}: {
  activePipelineCount: number;
  acceptedCount: number;
  completedCount: number;
}) {
  return (
    <div className="xl:hidden">
      <div className="rounded-[24px] bg-[#0c0f14] p-4 text-white shadow-[0_18px_50px_rgba(8,10,12,0.18)]">
        <div className="flex items-center justify-between gap-3">
          <Link href="/silicon-valley" className="flex min-w-0 items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="SFPLAYGROUND"
              width={42}
              height={42}
              className="rounded-full"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">SFPLAYGROUND</p>
              <p className="text-xs text-white/52">Private Club</p>
            </div>
          </Link>
          <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/78 ring-1 ring-white/10">
            <Sparkles className="size-3.5" />
            Demo
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <Image
            src={demoMember.image}
            alt={demoMember.name}
            width={58}
            height={58}
            className="size-[58px] rounded-2xl object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xl font-semibold tracking-tight">
              {demoMember.name}
            </p>
            <p className="mt-1 truncate text-sm text-white/56">
              {demoMember.company} - {demoMember.stage}
            </p>
            <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/62">
              {demoMember.lookingFor}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <MetricTile label="Active" value={activePipelineCount} dark compact />
          <MetricTile label="Accepted" value={acceptedCount} dark compact />
          <MetricTile label="Closed" value={completedCount} dark compact />
        </div>
      </div>
    </div>
  );
}

function DesktopNav({
  activeTab,
  setActiveTab,
  appliedCount,
}: {
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
  appliedCount: number;
}) {
  return (
    <nav className="mt-8 grid gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => setActiveTab(tab.id)}
          className={cx(
            "flex h-11 items-center justify-between rounded-xl px-3 text-left text-sm font-medium transition",
            activeTab === tab.id
              ? "bg-white text-[#0c0f14]"
              : "text-white/65 hover:bg-white/8 hover:text-white",
          )}
        >
          {tab.label}
          {tab.id === "applied" ? (
            <span className="rounded-full bg-white/12 px-2 py-0.5 text-xs">
              {appliedCount}
            </span>
          ) : null}
        </button>
      ))}
    </nav>
  );
}

function MobileTabBar({
  activeTab,
  setActiveTab,
  appliedCount,
}: {
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
  appliedCount: number;
}) {
  return (
    <nav className="sticky top-2 z-30 -mx-2 overflow-x-auto px-2 py-1 xl:hidden">
      <div className="flex w-max min-w-full gap-2 rounded-2xl bg-white/88 p-1.5 shadow-[0_14px_34px_rgba(8,10,12,0.12)] ring-1 ring-black/6 backdrop-blur-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cx(
              "relative inline-flex h-10 shrink-0 items-center gap-2 rounded-xl px-3 text-sm font-semibold transition",
              activeTab === tab.id
                ? "bg-[#0c0f14] text-white shadow-sm"
                : "text-[#626b76] hover:bg-[#f2f4f7]",
            )}
          >
            {tab.label}
            {tab.id === "applied" && appliedCount > 0 ? (
              <span
                className={cx(
                  "rounded-full px-1.5 py-0.5 text-[10px]",
                  activeTab === tab.id
                    ? "bg-white/18 text-white"
                    : "bg-[#e8ecf1] text-[#59616c]",
                )}
              >
                {appliedCount}
              </span>
            ) : null}
          </button>
        ))}
      </div>
    </nav>
  );
}

function MetricTile({
  label,
  value,
  dark = false,
  compact = false,
}: {
  label: string;
  value: number;
  dark?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={cx(
        "rounded-2xl",
        compact ? "p-2.5" : "p-3",
        dark ? "bg-white/8 ring-1 ring-white/10" : "bg-[#f2f4f7]",
      )}
    >
      <p
        className={cx(
          compact ? "text-xl" : "text-2xl",
          "font-semibold",
          dark && "text-white",
        )}
      >
        {value}
      </p>
      <p
        className={cx(
          "mt-1 text-[11px]",
          dark ? "text-white/50" : "text-[#77808b]",
        )}
      >
        {label}
      </p>
    </div>
  );
}

function AllPeopleView({
  experts,
  requests,
  search,
  setSearch,
  categoryOptions,
  selectedCategory,
  setSelectedCategory,
  onRequestIntro,
}: {
  experts: ClubExpert[];
  requests: IntroRequest[];
  search: string;
  setSearch: (value: string) => void;
  categoryOptions: string[];
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  onRequestIntro: (expert: ClubExpert) => void;
}) {
  return (
    <section className="rounded-[24px] bg-white p-4 shadow-[0_18px_60px_rgba(8,10,12,0.05)] sm:rounded-[26px] md:p-7">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-[1.65rem] font-semibold tracking-tight sm:text-2xl">
            All people
          </h2>
          <p className="mt-1 text-sm text-[#707985]">
            Request any expert. SFPLAYGROUND still approves and sends the warm
            intro manually.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8f98a3]" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search people"
              className="h-12 w-full rounded-xl bg-[#f3f5f7] pl-10 pr-4 text-sm outline-none ring-1 ring-black/6 transition focus:bg-white focus:ring-black/18 sm:h-11 sm:w-[260px]"
            />
          </label>
          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="h-12 rounded-xl bg-[#f3f5f7] px-3 text-sm outline-none ring-1 ring-black/6 transition focus:bg-white focus:ring-black/18 sm:h-11"
          >
            {categoryOptions.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:mt-6 md:grid-cols-2 md:gap-4 2xl:grid-cols-3">
        {experts.map((expert) => {
          const existingRequest = requests.find(
            (request) => request.expertId === expert.id,
          );
          return (
            <ExpertCard
              key={expert.id}
              expert={expert}
              existingRequest={existingRequest}
              onRequestIntro={onRequestIntro}
            />
          );
        })}
      </div>
    </section>
  );
}

function ExpertCard({
  expert,
  existingRequest,
  onRequestIntro,
}: {
  expert: ClubExpert;
  existingRequest?: IntroRequest;
  onRequestIntro: (expert: ClubExpert) => void;
}) {
  return (
    <article className="flex flex-col justify-between rounded-[22px] bg-[#f7f8fa] p-4 ring-1 ring-black/6 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_50px_rgba(8,10,12,0.08)] sm:min-h-[310px] sm:rounded-3xl">
      <div>
        <div className="flex items-start gap-4">
          <Image
            src={expert.image}
            alt={expert.name}
            width={72}
            height={72}
            className="rounded-2xl object-cover"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <h3 className="truncate text-lg font-semibold">{expert.name}</h3>
              <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-[#59616c] ring-1 ring-black/6">
                {expert.category}
              </span>
            </div>
            <p className="mt-1 text-sm text-[#66707c]">
              {expert.title}, {expert.company}
            </p>
          </div>
        </div>
        <p className="mt-5 text-sm leading-6 text-[#4f5965]">
          {expert.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {expert.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white px-3 py-1 text-xs text-[#58616c] ring-1 ring-black/6"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs text-[#737d89]">
          <Clock3 className="mr-1 inline size-3.5" />
          {expert.availability}
        </div>
        <button
          type="button"
          onClick={() => onRequestIntro(expert)}
          className={cx(
            "inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition sm:h-10 sm:w-auto",
            existingRequest
              ? "bg-white text-[#0c0f14] ring-1 ring-black/8 hover:bg-[#edf0f3]"
              : "bg-[#0c0f14] text-white hover:bg-[#252b33]",
          )}
        >
          {existingRequest ? introStatusLabels[existingRequest.status] : "Request intro"}
          <ArrowRight className="size-4" />
        </button>
      </div>
    </article>
  );
}

function RequestListView({
  title,
  description,
  requests,
}: {
  title: string;
  description: string;
  requests: IntroRequest[];
}) {
  return (
    <section className="rounded-[24px] bg-white p-4 shadow-[0_18px_60px_rgba(8,10,12,0.05)] sm:rounded-[26px] md:p-7">
      <div className="mb-6">
        <h2 className="text-[1.65rem] font-semibold tracking-tight sm:text-2xl">
          {title}
        </h2>
        <p className="mt-1 text-sm text-[#707985]">{description}</p>
      </div>
      {requests.length ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {requests.map((request) => (
          <RequestCard key={request.id} request={request} />
          ))}
        </div>
      ) : (
        <div className="rounded-[22px] bg-[#f7f8fa] p-8 text-center sm:rounded-3xl sm:p-10">
          <UserRoundPlus className="mx-auto size-7 text-[#8c96a1]" />
          <p className="mt-3 text-sm text-[#66707c]">
            Nothing here yet. Request an intro from the All people tab.
          </p>
        </div>
      )}
    </section>
  );
}

function RequestCard({ request }: { request: IntroRequest }) {
  const expert = findExpert(request.expertId);
  if (!expert) return null;

  return (
    <article className="rounded-[22px] bg-[#f7f8fa] p-4 ring-1 ring-black/6 sm:rounded-3xl">
      <div className="flex items-start gap-4">
        <Image
          src={expert.image}
          alt={expert.name}
          width={62}
          height={62}
          className="rounded-2xl object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold">{expert.name}</h3>
            <span
              className={cx(
                "rounded-full px-2.5 py-1 text-[11px] font-semibold",
                statusTone(request.status),
              )}
            >
              {introStatusLabels[request.status]}
            </span>
          </div>
          <p className="mt-1 text-sm text-[#66707c]">
            {expert.title}, {expert.company}
          </p>
        </div>
      </div>
      <p className="mt-5 text-sm leading-6 text-[#4f5965]">{request.goal}</p>
      <div className="mt-4 rounded-2xl bg-white p-4 text-sm leading-6 text-[#626b76] ring-1 ring-black/6">
        {request.notes}
      </div>
      <p className="mt-3 text-xs text-[#8b949f]">Updated {request.updatedAt}</p>
    </article>
  );
}

function AdminOpsView({
  requests,
  onUpdateStatus,
}: {
  requests: IntroRequest[];
  onUpdateStatus: (requestId: string, status: IntroStatus) => void;
}) {
  const queueCount = requests.filter((request) =>
    ["requested", "contacted"].includes(request.status),
  ).length;

  return (
    <section className="grid gap-3 md:gap-5 xl:grid-cols-[1fr_360px]">
      <div className="rounded-[24px] bg-white p-4 shadow-[0_18px_60px_rgba(8,10,12,0.05)] sm:rounded-[26px] md:p-7">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-[1.65rem] font-semibold tracking-tight sm:text-2xl">
              SFPLAYGROUND intro queue
            </h2>
            <p className="mt-1 text-sm text-[#707985]">
              Internal demo board. Update request statuses manually after the
              team contacts the expert and sends intros.
            </p>
          </div>
          <span className="inline-flex h-11 w-fit items-center gap-2 rounded-xl bg-[#0c0f14] px-4 text-sm font-semibold text-white sm:h-10">
            <Mail className="size-4" />
            {queueCount} need action
          </span>
        </div>

        <div className="space-y-3">
          {requests.map((request) => {
            const expert = findExpert(request.expertId);
            const member = findMember(request.memberId);
            if (!expert || !member) return null;

            return (
              <article
                key={request.id}
                className="grid gap-4 rounded-[22px] bg-[#f7f8fa] p-4 ring-1 ring-black/6 sm:rounded-3xl lg:grid-cols-[1.1fr_1fr_190px]"
              >
                <div className="flex gap-3">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={54}
                    height={54}
                    className="size-[54px] rounded-2xl object-cover"
                  />
                  <div>
                    <p className="font-semibold">{member.company}</p>
                    <p className="text-sm text-[#66707c]">
                      {member.name} wants {expert.name}
                    </p>
                    <p className="mt-2 text-xs text-[#7d8792]">{request.goal}</p>
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-3 text-sm leading-6 text-[#5f6874] ring-1 ring-black/6">
                  <p className="font-medium text-[#0c0f14]">Internal note</p>
                  <p className="mt-1">{request.notes}</p>
                </div>

                <div className="flex flex-col justify-between gap-3">
                  <span
                    className={cx(
                      "w-fit rounded-full px-2.5 py-1 text-[11px] font-semibold",
                      statusTone(request.status),
                    )}
                  >
                    {introStatusLabels[request.status]}
                  </span>
                  <select
                    value={request.status}
                    onChange={(event) =>
                      onUpdateStatus(request.id, event.target.value as IntroStatus)
                    }
                    className="h-11 w-full rounded-xl bg-white px-3 text-xs font-medium outline-none ring-1 ring-black/8 sm:h-10"
                  >
                    {Object.entries(introStatusLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <aside className="space-y-3 md:space-y-5">
        <div className="rounded-[24px] bg-white p-5 shadow-[0_18px_60px_rgba(8,10,12,0.05)] sm:rounded-[26px]">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-[#0c0f14] text-white">
              <BriefcaseBusiness className="size-5" />
            </div>
            <div>
              <p className="font-semibold">Member setup</p>
              <p className="text-sm text-[#707985]">Manual for now</p>
            </div>
          </div>
          <div className="mt-5 space-y-3">
            {clubMembers.map((member) => (
              <div key={member.id} className="flex items-center gap-3">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={38}
                  height={38}
                  className="rounded-xl object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{member.name}</p>
                  <p className="truncate text-xs text-[#7a838e]">
                    {member.company} - {member.stage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] bg-[#0c0f14] p-5 text-white shadow-[0_18px_60px_rgba(8,10,12,0.12)] sm:rounded-[26px]">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-white/10">
              <Users className="size-5" />
            </div>
            <div>
              <p className="font-semibold">Expert inventory</p>
              <p className="text-sm text-white/52">Added by SFPG only</p>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <MetricTile label="Active experts" value={clubExperts.filter((e) => e.active).length} dark />
            <MetricTile label="VCs" value={clubExperts.filter((e) => e.category === "VC").length} dark />
          </div>
          <div className="mt-5 rounded-2xl bg-white/8 p-4 text-sm leading-6 text-white/68 ring-1 ring-white/10">
            Next backend step: persist members, experts, and requests in a
            separate Silicon Valley Club table set.
          </div>
        </div>

        <div className="rounded-[24px] bg-white p-5 shadow-[0_18px_60px_rgba(8,10,12,0.05)] sm:rounded-[26px]">
          <p className="flex items-center gap-2 font-semibold">
            <CheckCircle2 className="size-5 text-[#1f8f55]" />
            No payments in app
          </p>
          <p className="mt-2 text-sm leading-6 text-[#707985]">
            Membership payment is assumed complete through Luma before SFPG
            creates the member profile.
          </p>
        </div>
      </aside>
    </section>
  );
}
