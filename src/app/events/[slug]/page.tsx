import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Nav from "@/component/landing/nav";
import Footer from "@/component/landing/footer";
import Image from "next/image";

const events: Record<
  string,
  {
    title: string;
    date: string;
    location: string;
    attendees: number;
    description: string;
    images: string[];
  }
> = {
  "ai-x-robotics": {
    title: "AI X ROBOTICS",
    date: "Dec 15, 2024",
    location: "SF Downtown",
    attendees: 150,
    description:
      "An electrifying evening showcasing the intersection of artificial intelligence and robotics. Founders from cutting-edge AI and robotics startups pitched their innovations to a panel of top VCs, demonstrating the future of technology.",
    images: [
      "https://drive.google.com/uc?export=view&id=10akfK0GLQnwwhl7AwtzyCZZqboqUwdbb",
      "https://drive.google.com/uc?export=view&id=1UBTj--twaLKJIeM-4BV9DGoVesEXgjjP",
      "https://drive.google.com/uc?export=view&id=1ncRT5nTVvd2U5qG16C3eity-ZSnbQUuL",
      "https://drive.google.com/uc?export=view&id=1cDOhd119r7oJc1oSmXERz9YM9i2bbNTX",
      "https://drive.google.com/uc?export=view&id=1Q5wztfDLdCWwALvWL-VYF093DcHDyZKp",
      "https://drive.google.com/uc?export=view&id=1rjtcqz-O2o_0R6JFXv34h9VCx7s8mX36",
      "https://drive.google.com/uc?export=view&id=15uvMacHNm6wnVmawW_suiERnsCv0TYIP",
      "https://drive.google.com/uc?export=view&id=14jweNvLo0PVPGZ4yw1dnmnH01yLqNw4N",
      "https://drive.google.com/uc?export=view&id=129cNr7ZlruttHxUupYc2WWCN5exNpYLO",
      "https://drive.google.com/uc?export=view&id=18B7qv8TtHdozBJonL_wSF1KvkBKZ_oZ7",
      "https://drive.google.com/uc?export=view&id=1xiXnVpRk5RPQGivIXuv0Fw8G3J6Y5fSu",
      "https://drive.google.com/uc?export=view&id=1EmPGUJXndScOSNLLDXJTp_0O6EUqUzj8",
      "https://drive.google.com/uc?export=view&id=1bRB1_rZvMbfGNsU8p3e7B3wmtX4jVtPi",
      "https://drive.google.com/uc?export=view&id=17YASaY5FONLT9y9v4d0qww0cqAtLRsNI",
      "https://drive.google.com/uc?export=view&id=1T6kWAOoXPT2apex-cQD90gXkVTXFYNSJ",
      "https://drive.google.com/uc?export=view&id=1YWadCWOE48BEBLgfwR9-3XA3J93xbv7J",
      "https://drive.google.com/uc?export=view&id=16GxPRbQL9x5CtYzyi4qOMTPSsUP_X-Y0",
      "https://drive.google.com/uc?export=view&id=1MBAm1KHt9HHA_AKb-I8wI64vnTSjlYCq",
      "https://drive.google.com/uc?export=view&id=1AYKzi6WAYcYE1iHN-SMgWWofm3XEm9dF",
      "https://drive.google.com/uc?export=view&id=1_IHtmy3qYOGXxmr_RPYNWOO2Ezu_HqK0",
      "https://drive.google.com/uc?export=view&id=1lDXxaXwg2tjQIKDnWr06tWrRrKHinyxT",
      "https://drive.google.com/uc?export=view&id=1PtHc3J6DQwkA0Cg3N1iKXmPLbC85yxhl",
      "https://drive.google.com/uc?export=view&id=1xLOdx1qFP4CkylRTaY5OV09wwoX1Skde",
      "https://drive.google.com/uc?export=view&id=1R2XWa1t8LfijHjZ19X8y0-tfRUMt4UV7",
      "https://drive.google.com/uc?export=view&id=1D7SFgVQpOhm9vsVX-3yG6-qRU6ua_fwR",
      "https://drive.google.com/uc?export=view&id=1pH1_sBcw3P6pyIv3p76R9YN5ANWPfUzd",
      "https://drive.google.com/uc?export=view&id=1RtWrENtFoWsOFWbp6uWtoQ3aFXbFYAr2",
      "https://drive.google.com/uc?export=view&id=1uolCAOvyRHw53cJxZilvGExhyf1izVBD",
      "https://drive.google.com/uc?export=view&id=16dgOi_lvX8-1pJm1xzJShhjQpj597-MZ",
      "https://drive.google.com/uc?export=view&id=15VVt9nHrQfakw4s-1ZiZg31CzuZ-HaTp",
      "https://drive.google.com/uc?export=view&id=13z15JieIb2_x4t9SFUUxPpLu8VooByFJ",
      "https://drive.google.com/uc?export=view&id=1N91BEb6QIa1nZEipkl0DPI-4RnieS0zg",
      "https://drive.google.com/uc?export=view&id=1k9_d2iG4GgNFzx8oXeX9hOxrrYjGXl1Y",
      "https://drive.google.com/uc?export=view&id=1mspaS4Euclbpnxo27-ojpxvSUKKHR3Zu",
      "https://drive.google.com/uc?export=view&id=15pQ6BiMUYUTCXEtAZ6hY9DOdaoK9ibF3",
      "https://drive.google.com/uc?export=view&id=1CnaliyQg7hR_0Zmv5YyZMk9_0KkQ2NGk",
      "https://drive.google.com/uc?export=view&id=1qCoy0mS2Xi4QxzSmGW3vJV65zhL_C8uA",
      "https://drive.google.com/uc?export=view&id=1nmdFrK2Ooh7No3uycKD26pgS7UBs-yw-",
      "https://drive.google.com/uc?export=view&id=1OE8QAFiSmgLqZldUFEJnWuODQEQg9W8x",
      "https://drive.google.com/uc?export=view&id=1Db3iAiWz6ScCivdCeFuFlsu_mT-EHCwA",
      "https://drive.google.com/uc?export=view&id=1S4ot4soUZCCPu5dIpppnjoR3uWM1kjmM",
      "https://drive.google.com/uc?export=view&id=1om1w4EQkUvp_fngc0J4-NBoh-TnIgJBV",
      "https://drive.google.com/uc?export=view&id=1sp9sQRdWKWplAyZv0M1fCsJqiCVCEh_o",
      "https://drive.google.com/uc?export=view&id=1Ml-WDp84DtP9CnTwkG_nND-wYNMCN-lB",
    ],
  },
  "ice-tank-challenge": {
    title: "Ice Tank Challenge",
    date: "Nov 22, 2024",
    location: "Mission District",
    attendees: 80,
    description:
      "The ultimate test of resilience and conviction. Founders pitched to VCs while immersed in an ice tank - proving that the best pitches come from those who can stay cool under pressure, literally. This unique challenge separated the committed from the casual, creating unforgettable moments and real connections.",
    images: [
      "/ice_tank/FFB98278-927E-47EC-B27A-BAC34261B9AF_1_102_o.jpeg",
      "/ice_tank/D420099B-DD6C-49A4-BDF2-F0BFD82236DB_1_102_o.jpeg",
      "/ice_tank/CCB48353-7E7C-4FB9-ADAE-F07AB4529F05_1_102_o.jpeg",
      "/ice_tank/BDACC1E1-BD27-4FEE-BD9D-9436A332842D_1_102_o.jpeg",
      "/ice_tank/9C1AE707-02C1-432A-8E87-F6E3BF496703_1_102_o.jpeg",
      "/ice_tank/9B251A2B-D35F-40C4-819C-162D8621D2BC_1_102_o.jpeg",
      "/ice_tank/87025B3D-6772-48F6-BEA0-AF8CB229D353_1_102_o.jpeg",
      "/ice_tank/8165B9C3-CC46-4EED-B5CF-4F7E4D37BBAF_1_102_o.jpeg",
      "/ice_tank/7B393BC0-0AAE-4C1E-ACB3-32B2A5FAF158_1_102_o.jpeg",
      "/ice_tank/4BB0DC4C-BB1F-4080-8888-D2A06177D4B2_1_102_o.jpeg",
      "/ice_tank/3DB75D97-4DC6-456E-9C3B-5D375028C5F2_1_102_o.jpeg",
      "/ice_tank/3428A167-B2B2-4C85-B58F-1AF8708AD544_1_102_o.jpeg",
      "/ice_tank/2F0125B7-402D-4C25-8D10-1FD22DF9A9EB_1_102_o.jpeg",
      "/ice_tank/2E5CC277-BE35-47D4-B3E0-EC9BD6C94827_1_102_o.jpeg",
      "/ice_tank/1B8CC5A1-7C96-4B1A-9678-EED3D1EB9168_1_102_o.jpeg",
      "/ice_tank/0BC2DF65-E9B1-4191-9135-C83C8AFC9857_1_102_o.jpeg",
      "/ice_tank/0A083BC6-9457-4585-980D-F0FA97DCD197_1_102_o.jpeg",
    ],
  },
  "founder-mixer": {
    title: "Founder Mixer",
    date: "Oct 5, 2024",
    location: "SOMA",
    attendees: 200,
    description:
      "Our largest networking event of the year. Founders, investors, and industry leaders came together for an evening of connections, inspiration, and celebration.",
    images: [
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2832&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=2832&auto=format&fit=crop",
    ],
  },
};

export default async function EventGalleryPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const normalizedSlug = resolvedParams.slug.toLowerCase().trim();
  const event = events[normalizedSlug];

  if (!event) {
    return (
      <div className="relative overflow-x-hidden bg-black min-h-screen">
        <Nav />
        <div className="pt-24 pb-16 px-4 md:px-8 lg:px-12 text-center">
          <h1 className="text-4xl font-oswald text-white mb-4">
            Event Not Found
          </h1>
          <Link
            href="/#events"
            className="text-[#feca00] hover:underline font-oswald"
          >
            Back to Events
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative overflow-x-hidden bg-black min-h-screen">
      <Nav />
      <div className="pt-24 pb-16 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Link
            href="/#events"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 font-oswald transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Link>

          {/* Header */}
          <div className="mb-12">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-oswald font-bold rounded backdrop-blur-sm">
                PAST EVENT
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-oswald text-white mb-4">
              {event.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-white/70 font-oswald mb-6">
              <span>{event.date}</span>
              <span>•</span>
              <span>{event.location}</span>
              <span>•</span>
              <span>{event.attendees} attendees</span>
            </div>
            <p className="text-white/80 text-lg font-oswald leading-relaxed max-w-3xl">
              {event.description}
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {event.images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden border border-white/20 group cursor-pointer"
              >
                <Image
                  src={image}
                  alt={`${event.title} - Image ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

