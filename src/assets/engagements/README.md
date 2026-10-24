# Organisation and platform logos

Logos shown in the "Our Experience & Track Record" section (`src/components/TrackRecord.jsx`) and beside the sale channels on the Auctions & tenders page. Each file is the organisation's own logo, taken from its official website or, where the website does not serve a usable file, from the logo in its Wikipedia infobox. Files are optimised (SVGO, or resized to WebP) but never redrawn, recoloured or cropped. Logos are trademarks of their owners and appear only to identify them.

| File | Organisation | Source |
| --- | --- | --- |
| `saudi-aramco.svg` | Saudi Aramco — أرامكو السعودية | Wikipedia infobox (`Saudi_Aramco_logo.svg`) |
| `saudi-energy.svg` | Saudi Energy, formerly Saudi Electricity Company — السعودية للطاقة | Wikipedia infobox (`Saudi_Energy_Logo.svg`) |
| `yasref.webp` | Yanbu Aramco Sinopec Refining Company (YASREF) — ياسرف | yasref.com header logo |
| `sadara.svg` | Sadara Chemical Company — صدارة للكيميائيات | sadara.com (`logo-color.svg`) |
| `tasnee.svg` | Tasnee — التصنيع | tasnee.com SVG sprite (`#logo-original`) |
| `saudi-water-authority.svg` | Saudi Water Authority — الهيئة السعودية للمياه | swa.gov.sa (`swa-logo-dark.svg`) |
| `military-industries-corporation.svg` | Military Industries Corporation — المؤسسة العامة للصناعات العسكرية | mic.gov.sa (`logo-nav2.svg`); the stylesheet class is written as a fill attribute |
| `mobily.svg` | Mobily — موبايلي | Wikimedia Commons (`Mobily_Logo.svg`) |
| `abdulla-fouad-group.svg` | Abdulla Fouad Group — مجموعة عبدالله فؤاد | abdulla-fouad.com (`logo.svg`) |
| `olayan.webp` | Olayan — العليان | olayan.com (`Olayan-WL.png`, published reversed only, so it is set on a navy plate) |
| `nabors.svg` | Nabors — نابورز | Wikimedia Commons (`Nabors_Industries_logo.svg`) |
| `al-qahtani-auctions.webp` | Al-Qahtani Auctions Company — شركة القحطاني للمزادات | qahtaniauction.com (`logo-sqc.png`, the SQC emblem; the full lockup is published with white lettering only) |
| `etimad.svg` | Etimad — منصة اعتماد | portal.etimad.sa (`Content/dga/img/logo.svg`) |
| `emazad.svg` | Saudi eMazad — المزاد الإلكتروني | emazad.sa (`assets/images/mother-theme.svg`) |

To replace a logo, keep the file name, update `ratio` (width ÷ height of the artwork) in `src/data/engagements.js`, and run `npm test`, which checks every ratio against its file.
