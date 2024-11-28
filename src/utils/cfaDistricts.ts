// Map of brigade codes to their district numbers
export const CFA_DISTRICTS: Record<string, number> = {
    // FRV Stations (Metropolitan Fire District)
    'P01': 14, // Eastern Hill
    'P02': 14, // West Melbourne
    'P03': 14, // Carlton
    'P04': 14, // Brunswick
    'P05': 14, // Broadmeadows
    'P06': 14, // Pascoe Vale
    'P07': 14, // Thomastown
    'P09': 14, // Somerton
    'P10': 14, // Richmond
    'P11': 14, // Epping
    'P12': 14, // Preston
    'P13': 14, // Northcote
    'P14': 14, // Bundoora
    'P15': 14, // Heidelberg
    'P16': 14, // Greensborough
    'P18': 14, // Hawthorn
    'P19': 14, // North Balwyn
    'P20': 13, // Box Hill
    'P22': 13, // Ringwood
    'P23': 13, // Burwood
    'P24': 13, // Glen Iris
    'P25': 13, // Oakleigh
    'P26': 13, // Croydon
    'P27': 13, // Nunawading
    'P28': 13, // Vermont South
    'P29': 8,  // Clayton
    'P30': 13, // Templestowe
    'P31': 13, // Glen Waverley
    'P32': 8,  // Ormond
    'P33': 8,  // Mentone
    'P34': 8,  // Highett
    'P35': 8,  // Windsor
    'P38': 14, // South Melbourne
    'P39': 14, // Port Melbourne
    'P40': 14, // Laverton
    'P41': 14, // St Albans
    'P42': 14, // Newport
    'P43': 14, // Deer Park
    'P44': 14, // Sunshine
    'P45': 14, // Brooklyn
    'P46': 14, // Altona
    'P47': 14, // Footscray
    'P48': 14, // Taylors Lakes
    'P51': 14, // Keilor
    'P52': 14, // Tullamarine
    'P53': 14, // Sunbury
    'P54': 14, // Greenvale
    'P55': 14, // Caroline Springs
    'P56': 14, // Melton
    'P57': 14, // Tarneit
    'P58': 14, // Point Cook
    'P59': 14, // Derrimut
    'P61': 7,  // Lara
    'P62': 7,  // Corio
    'P63': 7,  // Geelong City
    'P63B': 7, // Geelong City
    'P64': 7,  // Belmont
    'P66': 7,  // Ocean Grove
    'P67': 15, // Ballarat City
    'P67B': 15, // Ballarat City
    'P68': 15, // Lucas
    'P70': 4,  // Warrnambool
    'P71': 4,  // Portland
    'P72': 18, // Mildura
    'P73': 2,  // Bendigo
    'P74': 23, // Wangaratta
    'P75': 22, // Shepparton
    'P76': 24, // Wodonga
    'P77': 27, // Traralgon
    'P78': 27, // Morwell
    'P79': 27, // Latrobe West
    'P80': 14, // Craigieburn
    'P81': 14, // South Morang
    'P82': 14, // Eltham
    'P84': 13, // South Warrandyte
    'P85': 13, // Boronia
    'P86': 13, // Rowville
    'P87': 8,  // Dandenong
    'P88': 8,  // Hallam
    'P89': 8,  // Springvale
    'P90': 8,  // Patterson River
    'P91': 8,  // Frankston
    'P91A': 8, // Frankston
    'P91B': 8, // Frankston
    'P92': 8,  // Cranbourne
    'P93': 8,  // Pakenham
    'P94': 8,  // Mornington
    'P95': 8,  // Rosebud
  
    // FS prefix variants (same districts as P prefix)
    'FS01': 14, 'FS02': 14, 'FS03': 14, 'FS04': 14, 'FS05': 14,
    'FS06': 14, 'FS07': 14, 'FS09': 14, 'FS10': 14, 'FS11': 14,
    'FS12': 14, 'FS13': 14, 'FS14': 14, 'FS15': 14, 'FS16': 14,
    'FS18': 14, 'FS19': 14, 'FS20': 13, 'FS22': 13, 'FS23': 13,
    'FS24': 13, 'FS25': 13, 'FS26': 13, 'FS27': 13, 'FS28': 13,
    'FS29': 8, 'FS30': 13, 'FS31': 13, 'FS32': 8, 'FS33': 8,
    'FS34': 8, 'FS35': 8, 'FS38': 14, 'FS39': 14, 'FS40': 14,
    'FS41': 14, 'FS42': 14, 'FS43': 14, 'FS44': 14, 'FS45': 14,
    'FS46': 14, 'FS47': 14, 'FS48': 14, 'FS51': 14, 'FS52': 14,
    'FS53': 14, 'FS54': 14, 'FS55': 14, 'FS56': 14, 'FS57': 14,
    'FS58': 14, 'FS59': 14, 'FS61': 7, 'FS62': 7, 'FS63': 7,
    'FS63B': 7, 'FS64': 7, 'FS66': 7, 'FS67': 15, 'FS67B': 15,
    'FS68': 15, 'FS70': 4, 'FS71': 4, 'FS72': 18, 'FS73': 2,
    'FS74': 23, 'FS75': 22, 'FS76': 24, 'FS77': 27, 'FS78': 27,
    'FS79': 27, 'FS80': 14, 'FS81': 14, 'FS82': 14, 'FS84': 13,
    'FS85': 13, 'FS86': 13, 'FS87': 8, 'FS88': 8, 'FS89': 8,
    'FS90': 8, 'FS91': 8, 'FS91A': 8, 'FS91B': 8, 'FS92': 8,
    'FS93': 8, 'FS94': 8, 'FS95': 8,
  
    // Specialized Units
    'R3': 14,  // Rescue Carlton
    'R7': 14,  // Rescue Carlton
    'TB10': 14, // Teleboom Richmond
    'BA38': 14, // BA Support South Melbourne
    'HZ88': 8,  // Hazmat Hallam
    'PT14': 14, // Pumper Tanker Bundoora
    'LP87': 8,  // Ladder Platform Dandenong
    'PT9': 14,  // Pumper Tanker Somerton
    'PT31': 13, // Pumper Tanker Glen Waverley
    'BA1': 14,  // BA Support Eastern Hill
    'PH1': 14,  // Platform Hydraulic Eastern Hill
    'R1': 14,   // Rescue Eastern Hill
    'R2': 14,   // Rescue West Melbourne
    'R38': 14,  // Rescue South Melbourne
    'R87': 8,   // Rescue Dandenong
    'HZ1': 14,  // Hazmat Eastern Hill
    'TB38': 14, // Teleboom South Melbourne
    'TB87': 8,  // Teleboom Dandenong
    'LP1': 14,  // Ladder Platform Eastern Hill
    'LP38': 14, // Ladder Platform South Melbourne
  
    // CFA Districts
    'TOOM': 8,   // District 8 - Toomuc
    'CADW': 8,   // District 8 - Carrum Downs
    'ARAU': 16,  // District 16 - Ararat
    'DORE': 14,  // District 14 - Doreen
    'MERN': 14,  // District 14 - Mernda
    'HADD': 15,  // District 15 - Haddon
    'CARL': 2,   // District 2 - Carlsruhe
    'KYNE': 2,   // District 2 - Kyneton
    'NEWH': 2,   // District 2 - Newham
    'MALM': 2,   // District 2 - Malmsbury
    'PAST': 2,   // District 2 - Pastoria
    'TYLD': 2,   // District 2 - Tylden
    'GMER': 23,  // District 23 - Glenroy & Merrijig
    'MANU': 23,  // District 23 - Mansfield
    'KOOW': 8,   // District 8 - Koo Wee Rup
    'LANG': 8,   // District 8 - Lang Lang
    'WONG': 13,  // District 13 - Wonga Park
    'STHW': 13,  // District 13 - South Warrandyte
    'DARR': 14,  // District 14 - Darraweit Guim
    'BOLI': 14,  // District 14 - Bolinda & Monegetta
    'CBRN': 14,  // District 14 - Craigieburn
    'WALN': 7,   // District 7 - Wallington
    'LEOP': 7,   // District 7 - Leopold
    'DRYS': 7,   // District 7 - Drysdale
    'HAMP': 8,   // District 8 - Hampton Park
    'PTCO': 14,  // District 14 - Point Cook
    'MONB': 13,  // District 13 - Monbulk
    'BARW': 7,   // District 7 - Barwon Heads
    'STAR': 16,  // District 16 - St Arnaud
    'WALL': 14,  // District 14 - Wallan
    'WANG': 12,  // District 12 - Wandong
    'SHGP': 12,  // District 12 - Seymour Group
    'BMSH': 15,  // District 15 - Bacchus Marsh
    'YGON': 27,  // District 27 - Yarragon
    'KAKA': 14,  // District 14 - Kal Kallo
    'MACC': 13,  // District 13 - Macclesfield
    'TIGP': 5,   // District 5 - Timboon Group
    'KALL': 13,  // District 13 - Kallista-The Patch
    'PEAR': 8,   // District 8 - Pearcedale
    'SARS': 11,  // District 11 - Sarsfield
    'DAND': 8,   // District 8 - Dandenong
    'DROU': 9,   // District 9 - Drouin
    'BELG': 13,  // District 13 - Belgrave
    'UPWE': 13,  // District 13 - Upwey
    'GPGP': 16,  // District 16 - Grampians Group
    'WATT': 14,  // District 14 - Wattle Glen
    'HURS': 14,  // District 14 - Hurstbridge
    'BARM': 22,  // District 22 - Barmah
    'EHAM': 14,  // District 14 - Eltham
    'DIAM': 14,  // District 14 - Diamond Creek
    'COLA': 6,   // District 6 - Colac
    'SEYM': 12,  // District 12 - Seymour
    'NNTH': 8,   // District 8 - Narre Warren North
    'SILV': 13,  // District 13 - Silvan
    'COIM': 15,  // District 15 - Coimadai
    'CAGP': 6,   // District 6 - Camperdown Group
    'MBRK': 13,  // District 13 - Mooroolbark
    'YELL': 13,  // District 13 - Yellingbo
    'PKHM': 8,   // District 8 - Pakenham
    'COAT': 13,  // District 13 - Cockatoo
    'MARY': 8,   // District 8 - Maryknoll & District
    'PAKU': 8,   // District 8 - Pakenham Upper
    'BEUP': 8,   // District 8 - Beaconsfield Upper
    'BEAC': 8,   // District 8 - Beaconsfield
    'BAYL': 8,   // District 8 - Bayles
    'TYNO': 8,   // District 8 - Tynong
    'BUNY': 8,   // District 8 - Bunyip
    'MTON': 14,  // District 14 - Melton
    'GBRN': 14,  // District 14 - Gisborne
    'RIDD': 14,  // District 14 - Riddell's Creek
    'DAYL': 15,  // District 15 - Daylesford
    'WAND': 13,  // District 13 - Wandin
    'GRUY': 13,  // District 13 - Gruyere
    'SEVI': 13,  // District 13 - Seville
    'MTEV': 13,  // District 13 - Mt Evelyn
    'COLD': 13,  // District 13 - Coldstream
    'LARA': 7,   // District 7 - Lara
    'CORO': 7,   // District 7 - Corio
    'GGRY': 27,  // District 27 - Glengarry
    'SELB': 13,  // District 13 - Selby
    'TYAB': 8,   // District 8 - Tyabb
    'HSTG': 8,   // District 8 - Hastings
    'SNBY': 14,  // District 14 - Sunbury
    'HAMI': 4,   // District 4 - Hamilton
    'ELAI': 15,  // District 15 - Elaine
    'DIGG': 14,  // District 14 - Diggers Rest
    'MTMC': 14,  // District 14 - Mount Macedon
    'HANB': 15,  // District 15 - Hancock Ballarat
    'MACE': 14,  // District 14 - Macedon
    'HUNL': 2,   // District 2 - Huntly
    'WOOD': 14,  // District 14 - Woodend
    'WBOL': 4,   // District 4 - Warrnambool
    'CORN': 8,   // District 8 - Corinella
    'BASS': 8,   // District 8 - Bass
    'KERN': 8,   // District 8 - Kernot
    'ROWS': 15,  // District 15 - Rowsley
    'MORR': 15,  // District 15 - Morrisons & District
    'GORD': 15,  // District 15 - Gordon
    'LEGP': 15,  // District 15 - Leigh Group
    'CHIR': 13,  // District 13 - Chirnside Park
    'WENO': 15,  // District 15 - Wendouree
    'MEGE': 15,  // District 15 - Mt Egerton
    'WALA': 15,  // District 15 - Wallace
    'MTWA': 15,  // District 15 - Mt Wallace
    'MBOK': 15,  // District 15 - Millbrook
    'GEMB': 13,  // District 13 - Gembrook
    'SRGP': 18,  // District 18 - Sunraysia Group
    'NAWE': 8,   // District 8 - Narre Warren East
    'MINU': 17,  // District 17 - Minyip
    'BELS': 13,  // District 13 - Belgrave Heights & South
    'MORW': 27,  // District 27 - Morwell
    'KANG': 14,  // District 14 - Kangaroo Ground
    'MYGP': 20,  // District 20 - Mid Murray Group
    'MARO': 16,  // District 16 - Maroona
    'GUND': 24,  // District 24 - Gundowring
    'MILD': 18,  // District 18 - Mildura
    'LWGP': 17,  // District 17 - Lowan Group
    'NHTN': 4,   // District 4 - North Hamilton
    'DIXO': 14,  // District 14 - Dixons Creek
    'GRED': 15,  // District 15 - Greendale
    'BLAC': 15,  // District 15 - Blackwood
    'HESK': 14,  // District 14 - Hesket-Kerrie
    'NARN': 8,   // District 8 - Nar Nar Goon
    'BALA': 15,  // District 15 - Ballan
    'SLAT': 15,  // District 15 - Slaty Creek
    'MYRN': 15,  // District 15 - Myrniong
    'MERE': 15,  // District 15 - Meredith
    'MENZ': 13,  // District 13 - Menzies Creek
    'CAMP': 2,   // District 2 - Campbells Creek
    'MALD': 2,   // District 2 - Maldon
    'CHEW': 2,   // District 2 - Chewton
    'HARC': 2,   // District 2 - Harcourt
    'CMAI': 2,   // District 2 - Castlemaine
    'TARA': 2,   // District 2 - Taradale
    'RUPR': 17,  // District 17 - Rupanyup
    'MARN': 16,  // District 16 - Marnoo
    'RICH': 16,  // District 16 - Rich Avon
    'NOBL': 8,   // District 8 - Noble Park
    'WHNU': 22,  // District 22 - Wunghnu
    'NRNG': 22,  // District 22 - Naring
    'INGL': 2,   // District 2 - Inglewood
    'FENT': 2,   // District 2 - Fentons Creek
    'RHEO': 2,   // District 2 - Rheola
    'WEDR': 2,   // District 2 - Wedderburn
    'PAYN': 11,  // District 11 - Paynesville
    'BERR': 2,   // District 2 - Berrimal
    'ARTH': 14,  // District 14 - Arthurs Creek
    'NKAH': 22,  // District 22 - Numurkah
    'KATU': 22,  // District 22 - Katunga
    'QUEE': 7,   // District 7 - Queenscliff
    'MANN': 7,   // District 7 - Mannerim
    'STLE': 7,   // District 7 - St Leonards-Indented Head
    'TOOR': 8,   // District 8 - Tooradin
    'HIGH': 7,   // District 7 - Highton
    'HDGP': 4,   // District 4 - Hawkesdale Group
    'TEGP': 2,   // District 2 - East Loddon Group
    'WDGP': 2,   // District 2 - Wedderburn Group
    'LSGP': 15,  // District 15 - Gordon Group
    'MONT': 13,  // District 13 - Montrose
    'OCEA': 7,   // District 7 - Ocean Grove
    'LENT': 11,  // District 11 - Lakes Entrance
    'HALL': 8,   // District 8 - Hallam
    'BERW': 8,   // District 8 - Berwick
    'MILW': 23,  // District 23 - Milawa
    'NEWB': 27,  // District 27 - Newborough
    'ROCK': 14,  // District 14 - Rockbank
    'WARB': 13,  // District 13 - Warburton
    'STPE': 22,  // District 22 - Stanhope
    'MDRG': 2,   // District 2 - Mandurang
    'YEAA': 12,  // District 12 - Yea
    'WBEE': 14,  // District 14 - Werribee
    'REDC': 18,  // District 18 - Red Cliffs
    'PARW': 14,  // District 14 - Parwan
    'NAPO': 15,  // District 15 - Napoleons-Enfield
    'SRAT': 23,  // District 23 - South Wangaratta
    'RUBY': 23,  // District 23 - Ruby
    'TGAL': 22,  // District 22 - Tongala
    'WRAT': 23,  // District 23 - Wangaratta
    'KORU': 9,   // District 9 - Korumburra
    'BELM': 7,   // District 7 - Belmont
    'LANW': 8,   // District 8 - Langwarrin
    'LEVA': 24,  // District 24 - Leneva
    'MNTH': 9,   // District 9 - Mirboo North
    'GOLD': 2,   // District 2 - Golden Square
    'TOOL': 14,  // District 14 - Toolern Vale
    'HVIL': 13,  // District 13 - Healesville
    'NATH': 22,  // District 22 - Nathalia
    'HAWK': 4,   // District 4 - Hawkesdale
    'MOYS': 16,  // District 16 - Moyston
    'ANGP': 7,   // District 7 - Anakie Group
    'WGGP': 23,  // District 23 - Wangaratta Group
    'TREN': 15,  // District 15 - Trentham
    'BOOL': 27,  // District 27 - Boolarra
    'HALO': 9,   // District 9 - Hallora
    'GDGP': 2,   // District 2 - Tullaroop Group
    'BEND': 2,   // District 2 - Bendigo
    'JUNO': 2,   // District 2 - Junortoun
    'BARA': 15,  // District 15 - Ballarat
    'DARN': 9,   // District 9 - Darnum & Ellinbank
    'GIRG': 22,  // District 22 - Girgarre
    'EPGP': 2,   // District 2 - Bendigo Group
    'SCOR': 13,  // District 13 - Scoresby
    'BAYS': 13,  // District 13 - Bayswater
    'BORO': 13,  // District 13 - Boronia
    'HEAT': 8,   // District 8 - Heath Hill - Yannathan
    'OFFI': 8,   // District 8 - Officer
    'SMYT': 15,  // District 15 - Smythesdale
    'RYEA': 8,   // District 8 - Rye
    'HWOD': 27,  // District 27 - Hazelwood North
    'CHUR': 27,  // District 27 - Churchill
    'KILM': 12,  // District 12 - Kilmore
    'MRST': 15,  // District 15 - Miners Rest
    'ROSR': 27,  // District 27 - Rosedale
    'LFRD': 27,  // District 27 - Longford
    'SALE': 10,  // District 10 - Sale
    'BRFD': 12,  // District 12 - Broadford
    'HOPP': 14,  // District 14 - Hoppers Crossing
    'SVAL': 8,   // District 8 - Springvale
    'SEST': 22,  // District 22 - Shepparton East
    'SHEP': 22,  // District 22 - Shepparton
    'MPNA': 22,  // District 22 - Mooroopna
    'EDIT': 8,   // District 8 - Edithvale
    'PLEN': 14,  // District 14 - Plenty
    'GREE': 14,  // District 14 - Greenvale
    'WSTO': 14,  // District 14 - Woodstock West
    'TARN': 2,   // District 2 - Tarnagulla
    'PETE': 4,   // District 4 - Peterborough
    'NIRR': 4,   // District 4 - Nirranda South
    'LHEY': 4,   // District 4 - Lower Heytesbury
    'DROM': 8,   // District 8 - Dromana
    'MORO': 8,   // District 8 - Moorooduc
    'YARR': 14,  // District 14 - Yarrambat
    'KYAB': 22,  // District 22 - Kyabram
    'STRU': 10,  // District 10 - Stratford
    'CBNK': 10,  // District 10 - Clydebank
    'AVEN': 12,  // District 12 - Avenel
    'SKYE': 8,   // District 8 - Skye
    'FERN': 13,  // District 13 - Ferntree Gully
    'MSGP': 4,   // District 4 - Mount Rouse Group
    'SHEL': 7,   // District 7 - Shelford
    'MLGP': 4,   // District 4 - Mortlake Group
    'ECHU': 20,  // District 20 - Echuca
    'LURG': 23,  // District 23 - Lurg
    'BENU': 23,  // District 23 - Benalla
    'WGAT': 22,  // District 22 - Whitegate
    'PORT': 7,   // District 7 - Portarlington
    'LOCK': 2,   // District 2 - Lockwood
    'COBR': 22,  // District 22 - Cobram
    'BONE': 8,   // District 8 - Boneo
    'BUNI': 15,  // District 15 - Buninyong
    'ROSE': 8,   // District 8 - Rosebud
    'RESE': 14,  // District 14 - Research
    'DERE': 15,  // District 15 - Dereel
    'SWAU': 18,  // District 18 - Swan Hill
    'KERA': 20,  // District 20 - Kerang
    'GNGP': 20,  // District 20 - Kerang Group
    'MORN': 8,   // District 8 - Mornington
    'ERIC': 27,  // District 27 - Erica & District
    'MIAM': 2,   // District 2 - Mia Mia
    'KOTU': 22,  // District 22 - Kotupna
    'PYAL': 12,  // District 12 - Pyalong
    'PRTF': 4,   // District 4 - Port Fairy
    'TATU': 22,  // District 22 - Tatura
    'NWMO': 22,  // District 22 - NW Mooroopna
    'MGUM': 22,  // District 22 - Merrigum
    'WYUN': 22,  // District 22 - Wyuna
    'CONN': 7,   // District 7 - Connewarre
    'UNDE': 22,  // District 22 - Undera
    'MTMA': 8,   // District 8 - Mt Martha
    'HORS': 17,  // District 17 - Horsham
    'WURD': 7,   // District 7 - Wurdale
    'MOYH': 23,  // District 23 - Moyhu
    'YULE': 4,   // District 4 - Yulecart
    'SWEU': 16,  // 'SWEU': 16,  // District 16 - Stawell
    'ADRA': 12,  // District 12 - Alexandra
    'ELDO': 23,  // District 23 - Eldorado
    'CHRI': 14,  // District 14 - Christmas Hills
    'MTBU': 15,  // District 15 - Mt Buninyong
    'AKDC': 6,   // District 6 - AKD-Calco
    'KORO': 4,   // District 4 - Koroit
    'STHM': 14,  // District 14 - South Morang
    'MOEE': 27,  // District 27 - Moe
    'KEYS': 8,   // District 8 - Keysborough
    'MAUD': 7,   // District 7 - Maude
    'THEB': 13,  // District 13 - The Basin
    'COOM': 22,  // District 22 - Cooma
    'BITT': 8,   // District 8 - Bittern
    'CRIB': 8,   // District 8 - Crib Point
    'TRUG': 14,  // District 14 - Truganina
    'EURO': 23,  // District 23 - Euroa
    'COLE': 4,   // District 4 - Coleraine
    'LOCH': 9,   // District 9 - Loch
    'HILC': 15,  // District 15 - Hillcrest
    'BOOR': 6,   // District 6 - Boorcan
    'BOOK': 6,   // District 6 - Bookaar
    'MAFF': 10,  // District 10 - Maffra
    'NADI': 17,  // District 17 - Natimuk & District
    'KOLO': 6,   // District 6 - Kolora
    'WING': 7,   // District 7 - Wingeel
    'MIDW': 6,   // District 6 - Midway - Otways
    'TERA': 6,   // District 6 - Terang
    'DIXI': 6,   // District 6 - Terang-Dixie
    'NOOR': 6,   // District 6 - Noorat & District
    'NOOJ': 9,   // District 9 - Noojee
    'HEYW': 4,   // District 4 - Heywood
    'STAN': 14,  // District 14 - St Andrews
    'NARR': 8,   // District 8 - Narre Warren
    'PANT': 14,  // District 14 - Panton Hill
    'WOLL': 14,  // District 14 - Wollert & District
    'EPPI': 14,  // District 14 - Epping
    'WRAK': 16,  // District 16 - Warrak
    'ANGL': 7,   // District 7 - Anglesea
    'TRQY': 7,   // District 7 - Torquay
    'MODE': 7,   // District 7 - Modewarre
    'NSTH': 9,   // District 9 - Neerim South
    'TATO': 23,  // District 23 - Tatong
    'MOLY': 23,  // District 23 - Molyullah
    'MNRO': 10,  // District 10 - Munro
    'WWST': 24,  // District 24 - Wodonga West
    'NITH': 9,   // District 9 - Nilma North
    'BWTR': 4,   // District 4 - Broadwater
    'LARP': 6,   // District 6 - Larpent
    'NALA': 6,   // District 6 - Nalangil
    'WAOG': 4,   // District 4 - Warrong
    'TLNG': 4,   // District 4 - Toolong
    'KIRK': 4,   // District 4 - Kirkstall
    'THNA': 23,  // District 23 - Thoona
    'WBEL': 17,  // District 17 - Warracknabeal
    'DONA': 17,  // District 17 - Donald
    'KSTN': 15,  // District 15 - Kingston
    'BOST': 6,   // District 6 - Bostocks Creek
    'TRIP': 12,  // District 12 - Terip Terip
    'BMCK': 16,  // District 16 - Buangor & Middle Creek
    'COBD': 6,   // District 6 - Cobden
    'CDWN': 6,   // District 6 - Camperdown
    'TALB': 2,   // District 2 - Talbot
    'MAGH': 2,   // District 2 - Maryborough
    'LEON': 9,   // District 9 - Leongatha
    'HGAP': 16,  // District 16 - Halls Gap
    'SOVL': 8,   // District 8 - Somerville
    'CBRK': 2,   // District 2 - Carisbrook
    'ELPH': 2,   // District 2 - Elphinstone
    'STRN': 22,  // District 22 - Strathmerton
    'BEXT': 20,  // District 20 - Bamawm Extension
    'EVIL': 22,  // District 22 - Deakin North West
    'WEME': 18,  // District 18 - Wemen
    'LRNE': 7,   // District 7 - Lorne
    'BBND': 18,  // District 18 - Boundary Bend
    'ROBI': 18,  // District 18 - Robinvale
    'DUMB': 9,   // District 9 - Dumbalk
    'BIRR': 6,   // District 6 - Birregurra
    'NARB': 12,  // District 12 - Narbethong
    'CRAN': 8,   // District 8 - Cranbourne
    'FTON': 8,   // District 8 - Frankston
    'GRID': 9,   // District 9 - Grand Ridge Plantations
    'TYER': 27,  // District 27 - Tyers
    'PISL': 9,   // District 9 - Phillip Island
    'INVE': 7,   // District 7 - Inverleigh
    'WBRY': 27,  // District 27 - Westbury
    'WGRO': 9,   // District 9 - Willowgrove
    'TWOL': 12,  // District 12 - Trawool
    'LSMR': 15,  // District 15 - Lismore
    'STON': 7,   // District 7 - Stonehaven
    'SEBA': 15,  // District 15 - Sebastopol
    'BARO': 6,   // District 6 - Barongarook West
    'LLOG': 16,  // District 16 - Langi Logan
    'GRRN': 16,  // District 16 - Great Western
    'PIMP': 17,  // District 17 - Pimpinio
    'WARA': 9,   // District 9 - Warragul
    'DOOE': 17,  // District 17 - Dooen
    'IMAY': 15,  // District 15 - Invermay
    'WODO': 24,  // District 24 - Wodonga
    'VTWN': 23,  // District 23 - Violet Town
    'BOHO': 23,  // District 23 - Boho
    'TRAR': 27,  // District 27 - Traralgon
    'TRAE': 27,  // District 27 - Traralgon East
    'SOME': 8,   // District 8 - Somers
    'BALN': 8,   // District 8 - Balnarring
    'PATR': 8,   // District 8 - Patterson River
    'DWST': 9,   // District 9 - Drouin West
    'SFLD': 15,  // District 15 - Springfield
    'BREE': 15,  // District 15 - Bungaree
    'WIGP': 7,   // District 7 - Winchelsea Group
    'GROV': 7,   // District 7 - Grovedale
    'GEWE': 7,   // District 7 - Geelong West
    'WHIT': 14,  // District 14 - Whittlesea
    'WBRN': 13,  // District 13 - Wesburn-Millgrove
    'LIND': 11,  // District 11 - Lindenow South
    'EMLD': 13,  // District 13 - Emerald
    'IRYM': 18,  // District 18 - Irymple
    'METU': 11,  // District 11 - Metung
    'BBRN': 7,   // District 7 - Bannockburn
    'WARR': 14,  // District 14 - Warrandyte
    'LOVE': 7,   // District 7 - Lovely Banks
    'BEGP': 7,   // District 7 - Bellarine Group
    'MAGP': 13,  // District 13 - Maroondah Group
    'WRAP': 17,  // District 17 - Werrap
    'KIAL': 22,  // District 22 - Kialla & District
    'YVGP': 13,  // District 13 - Yarra Valley Group
    'RAIU': 17,  // District 17 - Rainbow
    'DKGP': 9,   // District 9 - Deakin Group
    'CRKE': 6,   // District 6 - Cororooke
    'HOPU': 17,  // District 17 - Hopetoun
    'UPPE': 13,  // District 13 - Upper Ferntree Gully
    'ROWV': 13,  // District 13 - Rowville
    'HWES': 17,  // District 17 - Hopetoun West
    'YAAP': 17,  // District 17 - Yaapeet
    'SASS': 13,  // District 13 - Sassafras & Ferny Creek
    'DARG': 11,  // District 11 - Dargo
    'RAGL': 15,  // District 15 - Raglan
    'TADI': 23,  // District 23 - Tarrawingee & District
    'YACR': 24,  // District 24 - Yackandandah
    'LETH': 7,   // District 7 - Lethbridge
    'ANAK': 7,   // District 7 - Anakie
    'CLYD': 8,   // District 8 - Clyde
    'TOOB': 2,   // District 2 - Tooborac
    'DEAN': 7,   // District 7 - Deans Marsh
    'OTWY': 6,   // District 6 - Otway
    'LOWD': 23,  // District 23 - Longwood
    'BAWA': 24,  // District 24 - Barnawartha
    'THDL': 9,   // District 9 - Thorpdale
    'YYAH': 22,  // District 22 - Yarroweyah
    'YALC': 22,  // District 22 - Yalca & Yielima
    'PNGP': 15,  // District 15 - Bacchus Marsh Group
    'WAAI': 22,  // District 22 - Waaia
    'GLDA': 11,  // District 11 - Glenaladale
    'MZGP': 27,  // District 27 - Morwell Group
    'BRIA': 10,  // District 10 - Briagolong
    'FLOW': 12,  // District 12 - Flowerdale
    'DEVO': 8,   // District 8 - Devon Meadows
    'KFLT': 2,   // District 2 - Kangaroo Flat
    'BAXT': 8,   // District 8 - Baxter
    'BADG': 13,  // District 13 - Badger Creek
    'CHIU': 24,  // District 24 - Chiltern
    'WBBG': 2,   // District 2 - Wareek & Bung Bong
    'AMPH': 15,  // District 15 - Amphitheatre
    'AVOU': 16,  // District 16 - Avoca
    'WARD': 16,  // District 16 - Warrenmang & District
    'NYLK': 16,  // District 16 - Natte Yallock
    'MURC': 22,  // District 22 - Murchison
    'BDIS': 23,  // District 23 - Booroolite & District
    'DELA': 23,  // District 23 - Delatite Plantation
    'GBAY': 23,  // District 23 - Goughs Bay - Howes Creek
    'BDAL': 11,  // District 11 - Bairnsdale
    'BRUT': 11,  // District 11 - Bruthen
    'MTAM': 11,  // District 11 - Mossi - Tambo
    'EAGL': 2,   // District 2 - Eaglehawk
    'CBGP': 6,   // District 6 - Cobden Group
    'CRRO': 2,   // District 2 - Cross Roads
    'WVAL': 2,   // District 2 - Woodvale
    'CFRT': 2,   // District 2 - Campbells Forest
    'RAYW': 2,   // District 2 - Raywood
    'SPRH': 2,   // District 2 - Spring Hill
    'YWOU': 23,  // District 23 - Yarrawonga
    'BALM': 23,  // District 23 - Balmattum
    'COHU': 20,  // District 20 - Cohuna
    'ROER': 20,  // District 20 - Rochester
    'WAHG': 24,  // District 24 - Wahgunyah
    'GLBU': 12,  // District 12 - Glenburn
    'SCRC': 12,  // District 12 - Strath Creek-Reedy Creek
    'YLIM': 12,  // District 12 - Yea & Limestone
    'JHNS': 11,  // District 11 - Bumberrah
    'CLEM': 13,  // District 13 - Clematis
    'TUNG': 22,  // District 22 - Tungamah
    'MUCK': 22,  // District 22 - Muckatah
    'KATA': 22,  // District 22 - Katamatite
    'MMGP': 14,  // District 14 - Mount Macedon Group
    'BADD': 23,  // District 23 - Baddaginnie
    'BRIG': 24,  // District 24 - Bright
    'SZGP': 9,   // District 9 - Leongatha-Kourmburra Group
    'TBGP': 11,  // District 11 - Tambo Group
    'KORK': 20,  // District 20 - Koondrook
    'RLGP': 10,  // District 10 - Maffra Group
    'SWGP': 16,  // District 16 - Stawell Group
    'WINT': 23,  // District 23 - Winton
    'LBOG': 18,  // District 18 - Lake Boga
    'KALO': 13,  // District 13 - Kalorama & Mt Dandenong
    'MXGP': 2,   // District 2 - Metcalfe Group
    'YALN': 27,  // District 27 - Yallourn North
    'KALW': 11,  // District 11 - Kalimna West
    'TLOO': 11,  // District 11 - Toorloo
    'BULE': 15,  // District 15 - Bullengarook
    'CNGP': 2,   // District 2 - Kyneton Group
    'CWIN': 15,  // District 15 - Cardigan & Windermere
    'WSTH': 27,  // District 27 - Willung South
    'WLNG': 27,  // District 27 - Willung
    'NAMB': 27,  // District 27 - Nambrok
    'CJNG': 27,  // District 27 - Carrajung
    'REDH': 8,   // District 8 - Red Hill
    'ELMU': 16,  // District 16 - Elmhurst
    'AFLT': 24,  // District 24 - Allans Flat
    'ALGP': 12,  // District 12 - Alexandra Group
    'MEGP': 11,  // District 11 - Bairnsdale Group
    'NEWR': 10,  // District 10 - Newry
    'WSEA': 7,   // District 7 - Winchelsea
    'ERGP': 15,  // District 15 - Eureka Group
    'YAGL': 13,  // District 13 - Yarra Glen
    'OVGP': 23,  // District 23 - Ovens Valley Group
    'CAST': 4,   // District 4 - Casterton
    'WGEE': 24,  // District 24 - Wooragee
    'GRAN': 15,  // District 15 - Grange
    'AFRD': 4,   // District 4 - Allansford
    'TALA': 12,  // District 12 - Tallarook
    'HILD': 12,  // District 12 - Hilldene
    'SHRT': 23,  // District 23 - Springhurst
    'WILD': 14,  // District 14 - Wildwood
    'BULL': 14,  // District 14 - Bulla
    'MACA': 4,   // District 4 - Macarthur
    'LITT': 7,   // District 7 - Little River
    'OLIN': 13,  // District 13 - Olinda
    'LANC': 14,  // District 14 - Lancefield
    'ROMS': 14,  // District 14 - Romsey
    'BEAF': 16,  // District 16 - Beaufort
    'YINS': 27,  // District 27 - Yinnar South
    'FRES': 7,   // District 7 - Freshwater Creek
    'NDST': 2,   // District 2 - Newstead & District
    'FFRD': 2,   // District 2 - Franklinford
    'CTWN': 2,   // District 2 - Campbelltown
    'CDGP': 8,   // District 8 - Cardinia Group
    'ULLI': 2,   // District 2 - Ullina
    'KONA': 2,   // District 2 - Kooroocheang Werona
    'SMET': 2,   // District 2 - Smeaton
    'WNEN': 18,  // District 18 - Woorinen South
    'WAIT': 18,  // District 18 - Waitchie
    'GBST': 23,  // District 23 - Goorambat
    'HLGP': 27,  // District 27 - Traralgon Group
    'ULTI': 18,  // District 18 - Ultima
    'TGGP': 24,  // District 24 - Tallangatta Group
    'GERE': 6,   // District 6 - Gerangamete
    'FORE': 6,   // District 6 - Forrest
    'BARD': 6,   // District 6 - Barwon Downs
    'HCGP': 6,   // District 6 - Hopkins - Curdies Group
    'HODD': 13,  // District 13 - Hoddle's Creek
    'BARR': 7,   // District 7 - Barrabool
    'BUFR': 24,  // District 24 - Buffalo River
    'GAPS': 24,  // District 24 - Gapsted
    'MYRU': 24,  // District 24 - Myrtleford
    'VICV': 4,   // District 4 - Victoria Valley
    'SDWN': 4,   // District 4 - Strathdownie
    'RENN': 4,   // District 4 - Rennick Plantation
    'GRTR': 4,   // District 4 - Green Triangle Forest Pro
    'TANJ': 27,  // District 27 - Tanjil
    'MAID': 2,   // District 2 - Maiden Gully
    'MONG': 2,   // District 2 - Marong
    'CAPE': 15,  // District 15 - Cape Clear
    'LINT': 15,  // District 15 - Linton
    'ROJU': 15,  // District 15 - Rokewood Junction & Dist
    'HILL': 14,  // District 14 - Hillside
    'MTAY': 11,  // District 11 - Mount Taylor
    'IRRE': 6,   // District 6 - Irrewarra
    'BIGP': 15,  // District 15 - Creswick Group
    'BEEA': 6,   // District 6 - Beeac
    'CWIC': 15,  // District 15 - Creswick
    'NGAL': 4,   // District 4 - Naringal
    'KARR': 22,  // District 22 - Karramomus
    'RIGG': 22,  // District 22 - Rigg's Creek
    'MIEP': 22,  // District 22 - Miepoll
    'GLYN': 15,  // District 15 - Glenlyon
    'SLEY': 24,  // District 24 - Stanley
    'KING': 12,  // District 12 - Kinglake District
    'CAVE': 4,   // District 4 - Cavendish
    'KIWE': 12,  // District 12 - Kinglake West
    'BECU': 24,  // District 24 - Beechworth
    'WOGI': 9,   // District 9 - Wonthaggi
    'CLON': 12,  // District 12 - Clonbinane
    'ELMO': 20,  // District 20 - Elmore
    'MCAF': 2,   // District 2 - Metcalfe
    'WINI': 17,  // District 17 - Winiam & District
    'PROP': 17,  // District 17 - Propodollah
    'HUGP': 14,  // District 14 - Hume Group
    'NHIL': 17,  // District 17 - Nhill
    'SHOR': 8,   // District 8 - Shoreham
    'FLIN': 8,   // District 8 - Flinders
    'AIRE': 7,   // District 7 - Aireys Inlet
    'APSL': 17,  // District 17 - Apsley
    'SAYE': 2,   // District 2 - Strathfieldsaye
    'EAGP': 8,   // District 8 - South East Group
    'BCGP': 9,   // District 9 - Bass Coast Group
    'MUGP': 14,  // District 14 - Mount Cottrell Group
    'PIAN': 18,  // District 18 - Piangil
    'WPGP': 20,  // District 20 - Elmore Group
    'SUTT': 2,   // District 2 - Sutton Grange & Myrtle Ck
    'BGRP': 6,   // District 6 - Beeac Group
    'BWGP': 17,  // District 17 - Donald Group
    'RUSH': 20,  // District 20 - Rushworth
    'CBIN': 20,  // District 20 - Colbinabbin
    'TLEN': 20,  // District 20 - Toolleen
    'CORP': 20,  // District 20 - Corop
    'COWT': 20,  // District 20 - Corop West
    'TAGG': 12,  // District 12 - Taggerty
    'THRN': 12,  // District 12 - Thornton
    'ACHE': 12,  // District 12 - Acheron
    'POMO': 16,  // District 16 - Pomonal
    'MARR': 16,  // District 16 - Marraweeny
    'VTGP': 23,  // District 23 - Violet Town Group
    'YEGP': 12,  // District 12 - Yea Group
    'WANT': 14,  // District 14 - North Warrandyte
    'WDIS': 23,  // District 23 - Whitfield & District
    'TOLM': 23,  // District 23 - Tolmie & District
    'TRAU': 9,   // District 9 - Trafalgar
    'PLND': 4,   // District 4 - Portland
    'HOMW': 23,  // District 23 - Homewood
    'MUWD': 12,  // District 12 - Murrindindi & Woodbourne
    'TOLA': 12,  // District 12 - Toolangi
    'KIEW': 24,  // District 24 - Kiewa
    'TALU': 24,  // District 24 - Tallangatta
    'SCRK': 24,  // District 24 - Sandy Creek & Charleroi
    'WDUC': 6,   // District 6 - Wallinduc & District
    'BBNK': 6    // District 6 - Berrybank
  };
  
  export function getDistrictFromCode(code: string): number | undefined {
    // Handle numeric codes (FRV stations)
    if (/^\d+$/.test(code)) {
      return CFA_DISTRICTS[`P${code.padStart(2, '0')}`];
    }
  
    // Handle P and FS prefixes
    if (code.startsWith('P') || code.startsWith('FS')) {
      const baseCode = code.replace(/^(P|FS)/, '').split(/[A-Z]/)[0];
      const paddedCode = baseCode.padStart(2, '0');
      return CFA_DISTRICTS[`P${paddedCode}`] || CFA_DISTRICTS[code];
    }
  
    // Try direct lookup first
    let district = CFA_DISTRICTS[code];
    if (district) return district;
  
    // Try without numbers and special characters
    const cleanCode = code.replace(/[0-9\[\]_]/g, '');
    return CFA_DISTRICTS[cleanCode];
  }