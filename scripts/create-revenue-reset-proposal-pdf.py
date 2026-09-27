from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    Flowable,
    HRFlowable,
    KeepTogether,
    ListFlowable,
    ListItem,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "pdf" / "sfplayground-revenue-reset-proposal.pdf"


BRAND_RED = colors.HexColor("#E7473C")
INK = colors.HexColor("#111111")
MUTED = colors.HexColor("#5E6268")
LIGHT_BG = colors.HexColor("#F4F1EA")
PANEL = colors.HexColor("#FAFAF8")


class NumberBlock(Flowable):
    def __init__(self, value, label, width=1.55 * inch, height=0.82 * inch):
        super().__init__()
        self.value = value
        self.label = label
        self.width = width
        self.height = height

    def draw(self):
        c = self.canv
        c.saveState()
        c.setFillColor(PANEL)
        c.roundRect(0, 0, self.width, self.height, 8, stroke=0, fill=1)
        c.setFillColor(BRAND_RED)
        c.setFont("Helvetica-Bold", 15)
        c.drawString(0.13 * inch, 0.46 * inch, self.value)
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 7.8)
        text = self.label
        if len(text) > 30:
            text = text[:29] + "..."
        c.drawString(0.13 * inch, 0.2 * inch, text)
        c.restoreState()


def para(text, style):
    return Paragraph(text, style)


def bullets(items, style):
    return ListFlowable(
        [ListItem(Paragraph(item, style), leftIndent=10) for item in items],
        bulletType="bullet",
        start="circle",
        leftIndent=16,
        bulletFontName="Helvetica",
        bulletFontSize=8,
        bulletColor=BRAND_RED,
    )


def quote_box(text):
    table = Table(
        [[Paragraph(text, STYLES["Quote"])]],
        colWidths=[6.4 * inch],
        hAlign="CENTER",
    )
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), LIGHT_BG),
                ("BOX", (0, 0), (-1, -1), 0, LIGHT_BG),
                ("LEFTPADDING", (0, 0), (-1, -1), 16),
                ("RIGHTPADDING", (0, 0), (-1, -1), 16),
                ("TOPPADDING", (0, 0), (-1, -1), 13),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 13),
            ]
        )
    )
    return table


def section(title, body=None):
    parts = [Spacer(1, 0.08 * inch), Paragraph(title, STYLES["Section"])]
    if body:
        parts.append(Spacer(1, 0.06 * inch))
        parts.append(Paragraph(body, STYLES["Body"]))
    return parts


def draw_header_footer(canvas, doc):
    canvas.saveState()
    width, height = LETTER
    page = canvas.getPageNumber()

    if page > 1:
        canvas.setFillColor(MUTED)
        canvas.setFont("Helvetica", 8)
        canvas.drawString(doc.leftMargin, height - 0.42 * inch, "SFPLAYGROUND Revenue Reset")
        canvas.setStrokeColor(colors.HexColor("#E7E2D8"))
        canvas.line(doc.leftMargin, height - 0.52 * inch, width - doc.rightMargin, height - 0.52 * inch)

    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 8)
    canvas.drawRightString(width - doc.rightMargin, 0.38 * inch, f"{page}")
    canvas.restoreState()


base = getSampleStyleSheet()
STYLES = {
    "Title": ParagraphStyle(
        "Title",
        parent=base["Title"],
        fontName="Helvetica-Bold",
        fontSize=31,
        leading=34,
        textColor=INK,
        alignment=TA_LEFT,
        spaceAfter=10,
    ),
    "Subtitle": ParagraphStyle(
        "Subtitle",
        parent=base["BodyText"],
        fontName="Helvetica",
        fontSize=12.3,
        leading=17,
        textColor=MUTED,
        spaceAfter=18,
    ),
    "Kicker": ParagraphStyle(
        "Kicker",
        parent=base["BodyText"],
        fontName="Helvetica-Bold",
        fontSize=8,
        leading=10,
        textColor=BRAND_RED,
        spaceAfter=8,
        uppercase=True,
    ),
    "Section": ParagraphStyle(
        "Section",
        parent=base["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=16.5,
        leading=20,
        textColor=INK,
        spaceBefore=8,
        spaceAfter=4,
    ),
    "SmallSection": ParagraphStyle(
        "SmallSection",
        parent=base["Heading3"],
        fontName="Helvetica-Bold",
        fontSize=12.5,
        leading=15,
        textColor=INK,
        spaceBefore=10,
        spaceAfter=4,
    ),
    "Body": ParagraphStyle(
        "Body",
        parent=base["BodyText"],
        fontName="Helvetica",
        fontSize=9.7,
        leading=14.2,
        textColor=colors.HexColor("#232323"),
        spaceAfter=6,
    ),
    "BodyBold": ParagraphStyle(
        "BodyBold",
        parent=base["BodyText"],
        fontName="Helvetica-Bold",
        fontSize=9.7,
        leading=14.2,
        textColor=INK,
        spaceAfter=6,
    ),
    "Bullet": ParagraphStyle(
        "Bullet",
        parent=base["BodyText"],
        fontName="Helvetica",
        fontSize=9.3,
        leading=13.2,
        textColor=colors.HexColor("#232323"),
        spaceAfter=3,
    ),
    "Quote": ParagraphStyle(
        "Quote",
        parent=base["BodyText"],
        fontName="Helvetica-Bold",
        fontSize=13,
        leading=17,
        textColor=INK,
        alignment=TA_CENTER,
    ),
    "TableHead": ParagraphStyle(
        "TableHead",
        parent=base["BodyText"],
        fontName="Helvetica-Bold",
        fontSize=8.6,
        leading=11,
        textColor=colors.white,
    ),
    "TableCell": ParagraphStyle(
        "TableCell",
        parent=base["BodyText"],
        fontName="Helvetica",
        fontSize=8.6,
        leading=11,
        textColor=INK,
    ),
}


def build_story():
    story = []

    story.append(Spacer(1, 0.25 * inch))
    story.append(para("CONFIDENTIAL COFOUNDER PROPOSAL", STYLES["Kicker"]))
    story.append(para("SFPLAYGROUND Revenue Reset", STYLES["Title"]))
    story.append(
        para(
            "A direct plan to move from roughly $10K/month toward $50K/month by shifting from broad events to paid access products.",
            STYLES["Subtitle"],
        )
    )
    story.append(HRFlowable(width="100%", thickness=1.2, color=BRAND_RED, spaceAfter=18))
    story.append(
        Table(
            [
                [
                    NumberBlock("$10K", "current monthly revenue"),
                    NumberBlock("$50K", "monthly target"),
                    NumberBlock("$60", "ticket not selling"),
                    NumberBlock("0", "sponsorship traction"),
                ]
            ],
            colWidths=[1.72 * inch] * 4,
            hAlign="LEFT",
        )
    )
    story.append(Spacer(1, 0.22 * inch))
    story.append(
        para(
            "The current model is not enough. Tickets are hard to sell, demo booths are not moving, sponsorships are not closing, and industry-specific AI events are losing attendance. That means the market does not currently value our events as standalone paid products.",
            STYLES["Body"],
        )
    )
    story.append(
        para(
            "Recommendation: stop selling event attendance as the main product. Sell access, trust, curation, and measurable outcomes.",
            STYLES["BodyBold"],
        )
    )
    story.append(quote_box("The event is the container. The product is the outcome."))

    story.append(PageBreak())

    story.extend(
        section(
            "Current Problem",
            "Our offer is too broad. We are asking people to pay for attendance, booths, or sponsorship before they clearly believe the room will produce value.",
        )
    )
    story.append(
        bullets(
            [
                "Founders do not want booths. They want investors, customers, credibility, and momentum.",
                "Sponsors do not want logo placement. They want pipeline, qualified leads, and strategic relationships.",
                "Attendees do not want another AI mixer. They want access they cannot easily get elsewhere.",
                "Industry-specific AI events require a new audience build every time, which increases risk and weakens repeat demand.",
            ],
            STYLES["Bullet"],
        )
    )

    story.extend(section("What We Should Stop"))
    story.append(
        bullets(
            [
                "Relying on generic $60 tickets as the main revenue source.",
                "Selling demo booths as a core offer.",
                "Treating sponsorship as the primary growth path.",
                "Running broad 'AI in [industry]' events without committed buyers, investors, or anchor guests.",
                "Overlapping events that split our own audience.",
                "Committing to events that do not have a clear paid outcome.",
            ],
            STYLES["Bullet"],
        )
    )

    story.extend(section("New Positioning"))
    story.append(
        quote_box(
            "SFPLAYGROUND should become the curated access network helping founders break into the San Francisco ecosystem through investor rooms, customer introductions, founder visibility, and high-signal private events.",
        )
    )
    story.append(
        para(
            "This is stronger than saying we host startup events in San Francisco.",
            STYLES["Body"],
        )
    )

    story.append(PageBreak())

    story.extend(section("New Revenue Model"))
    products = [
        (
            "Founder Access Rooms",
            "20 accepted founders, 5-8 investors/operators, application-first, accepted founders pay, structured intros before and after the event.",
            "$250-$500 accepted founder seat; $1,000 premium package",
            "$15K-$24K/mo",
        ),
        (
            "SF Market Entry Package",
            "For out-of-town, international, or first-time Bay Area founders who need access, intros, event placement, and ecosystem context.",
            "$2,500-$7,500",
            "$20K/month",
        ),
        (
            "Founder Visibility Package",
            "Founder profile, event recap placement, photos/video, pitch/demo moment, LinkedIn feature, and newsletter inclusion.",
            "$1,000-$3,000",
            "$10K/month",
        ),
        (
            "Hiring / Talent Rooms",
            "AI startups pay to meet curated engineers, operators, GTM candidates, or founding-team talent.",
            "$500-$1,500 per hiring company",
            "$10K/event",
        ),
    ]
    table = [[para("Product", STYLES["TableHead"]), para("What It Sells", STYLES["TableHead"]), para("Pricing", STYLES["TableHead"]), para("Target", STYLES["TableHead"])]]
    for row in products:
        table.append([para(cell, STYLES["TableCell"]) for cell in row])
    product_table = Table(table, colWidths=[1.3 * inch, 2.45 * inch, 1.35 * inch, 1.25 * inch])
    product_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), INK),
                ("BACKGROUND", (0, 1), (-1, -1), colors.white),
                ("GRID", (0, 0), (-1, -1), 0.45, colors.HexColor("#DAD6CE")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    story.append(product_table)

    story.append(Spacer(1, 0.16 * inch))
    story.extend(section("$50K Monthly Target Mix"))
    mix = [
        ["Revenue source", "Monthly target"],
        ["Founder Access Rooms", "$15K"],
        ["SF Market Entry Packages", "$20K"],
        ["Founder Visibility Packages", "$10K"],
        ["Community tickets / smaller events", "$5K"],
        ["Total", "$50K"],
    ]
    mix_table = Table(
        [[para(c, STYLES["TableHead"] if i == 0 else STYLES["TableCell"]) for c in row] for i, row in enumerate(mix)],
        colWidths=[4.7 * inch, 1.55 * inch],
    )
    mix_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), INK),
                ("BACKGROUND", (0, 1), (-1, -2), colors.white),
                ("BACKGROUND", (0, -1), (-1, -1), LIGHT_BG),
                ("FONTNAME", (0, -1), (-1, -1), "Helvetica-Bold"),
                ("GRID", (0, 0), (-1, -1), 0.45, colors.HexColor("#DAD6CE")),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    story.append(mix_table)

    story.append(PageBreak())

    story.extend(section("30-Day Plan"))
    weeks = [
        (
            "Week 1: Reset the Offer",
            [
                "Pause weak industry-specific events unless demand is already proven.",
                "Remove booth-first language from sales.",
                "Build one core offer: Founder Access Room.",
                "Build one service offer: SF Market Entry Package.",
                "Create a simple one-page sales deck for each.",
            ],
        ),
        (
            "Week 2: Validate With Warm Leads",
            [
                "Talk to 30 founders, 10 investors/operators, and 10 out-of-town founders.",
                "Ask what outcome would make them pay.",
                "Do not build a large event until people say yes.",
            ],
        ),
        (
            "Week 3: Run First Paid Test",
            [
                "Launch SFPLAYGROUND Founder Access Room.",
                "Target 20 accepted founders and 5-8 investors/operators.",
                "Goal: $5K-$10K revenue.",
                "Use applications, structured intros, and post-event follow-up.",
            ],
        ),
        (
            "Week 4: Package Results",
            [
                "Publish recap.",
                "Count intros made.",
                "Collect testimonials.",
                "Identify repeat buyers.",
                "Upsell premium packages.",
            ],
        ),
    ]
    for title, items in weeks:
        story.append(KeepTogether([para(title, STYLES["SmallSection"]), bullets(items, STYLES["Bullet"])]))

    story.extend(section("Sales Messaging"))
    msg_rows = [
        ["Instead of", "Say"],
        ["Buy a ticket to our startup event.", "Apply for a curated founder access room built to connect serious founders with investors, operators, and strategic partners in San Francisco."],
        ["Buy a demo booth.", "Get structured visibility and targeted introductions inside a curated founder/investor room."],
        ["Sponsor our event.", "Partner with us only if you want direct access to a curated group of founders that match your target customer or investment thesis."],
    ]
    msg_table = Table(
        [[para(c, STYLES["TableHead"] if i == 0 else STYLES["TableCell"]) for c in row] for i, row in enumerate(msg_rows)],
        colWidths=[2.15 * inch, 4.1 * inch],
    )
    msg_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), INK),
                ("GRID", (0, 0), (-1, -1), 0.45, colors.HexColor("#DAD6CE")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    story.append(msg_table)

    story.append(PageBreak())

    story.extend(section("Decision Needed"))
    story.append(
        bullets(
            [
                "Stop treating sponsorships and demo booths as the main growth plan.",
                "Shift from broad events to paid access products.",
                "Run a 30-day validation sprint before committing to more industry-specific events.",
            ],
            STYLES["Bullet"],
        )
    )
    story.extend(section("Recommendation"))
    story.append(
        para(
            "SFPLAYGROUND should become a paid access network, not just an event company.",
            STYLES["BodyBold"],
        )
    )
    story.append(
        quote_box(
            "The event is the container. The product is access, trust, curation, and outcomes.",
        )
    )
    story.append(Spacer(1, 0.15 * inch))
    story.append(HRFlowable(width="100%", thickness=1, color=BRAND_RED, spaceAfter=12))
    story.append(
        para(
            "Next internal step: align on the 30-day sprint, pick one owner for validation calls, and do not launch another broad event until the paid offer is proven.",
            STYLES["BodyBold"],
        )
    )

    return story


def main():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(OUT),
        pagesize=LETTER,
        rightMargin=0.58 * inch,
        leftMargin=0.58 * inch,
        topMargin=0.68 * inch,
        bottomMargin=0.58 * inch,
        title="SFPLAYGROUND Revenue Reset Proposal",
        author="SFPLAYGROUND",
    )
    doc.build(build_story(), onFirstPage=draw_header_footer, onLaterPages=draw_header_footer)
    print(OUT)


if __name__ == "__main__":
    main()
