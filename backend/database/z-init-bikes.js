let res = db.biketypes.insert([
  {
    title: 'Gravel Bike',
  },
  {
    title: 'Mountain Bike',
  },
  {
    title: 'Racing Bike',
  },
  {
    title: 'Cross Bike',
  },
  {
    title: 'Trekking Bike',
  },
  {
    title: 'Folding bike',
  },
  {
    title: 'City Bike',
  },
  {
    title: 'E-Bike',
  },
]);

printjson(res);

let gravelBikeType = db.biketypes.find({ title: 'Gravel Bike' })[0];
let mountainBikeType = db.biketypes.find({ title: 'Mountain Bike' })[0];
let cityBike = db.biketypes.find({ title: 'City Bike' })[0];
let eBike = db.biketypes.find({ title: 'E-Bike' })[0];
let racingBike = db.biketypes.find({ title: 'Racing Bike' })[0];
let crossBike = db.biketypes.find({ title: 'Cross Bike' })[0];
let trekkingBike = db.biketypes.find({ title: 'Trekking Bike' })[0];
let klapprad = db.biketypes.find({ title: 'Folding bike' })[0];

let tut1 = db.tutorials.find({ name: 'Replace Flat Handlebar Bicycle Grips' })[0];
let tut2 = db.tutorials.find({ name: 'Adjust a Front Derailleur' })[0];
let tut3 = db.tutorials.find({ name: 'Remove and Install a Bicycle Tire and Tube' })[0];
let tut4 = db.tutorials.find({ name: 'Replace bicycle seat' })[0];
let tut5 = db.tutorials.find({ name: 'Replace bar tape' })[0];
let tut6 = db.tutorials.find({ name: 'Replacing bike frame' })[0];
let tut7 = db.tutorials.find({ name: 'Fix slipped bike chain' })[0];

db.bikecomponents.insert([
  {
    name: 'Dymoece Mountain Bike Handlebar Grips',
    tutorial: tut1._id,
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    componentPart: 'Cockpit'
  },
  {
    name: 'Shimano GRX400 Rear Derailluer',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    componentPart: 'Drivetrain'
  },
  {
    name: 'Shimano GRX400 Front Derailluer',
    tutorial: tut2._id,
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    componentPart: 'Drivetrain'
  },
  {
    name: 'Shimano ST-RX400/BR-RX400 Brakes',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    componentPart: 'Drivetrain'
  },
  {
    name: 'DT Swiss P1850 Spline Disc',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    componentPart: 'Drivetrain'
  },
  {
    name: 'Shimano RX600/RX400 Brakes',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    componentPart: 'Drivetrain'
  },
  {
    name: 'Shimano GRX RX812 Rear Derailleur',
    tutorial: tut2._id,
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    componentPart: 'Drivetrain'
  },
  {
    name: 'Shimano GRX 810 Front Derailleur',
    tutorial: tut2._id,
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    componentPart: 'Drivetrain'
  },
  {
    name: 'Shimano GRX 810 Rear Derailleur',
    tutorial: tut2._id,
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    componentPart: 'Drivetrain'
  },
  {
    name: 'Wittkop Mountain Bike Seat ',
    tutorial: tut4._id,
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    componentPart: 'Saddle'
  },
  {
    name: 'Sitero Bike Seat',
    tutorial: tut4._id,
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    componentPart: 'Saddle'
  },
  {
    name: 'Schwinn Bike Tire',
    tutorial: tut3._id,
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    componentPart: 'BackWheel'
  },
  {
    name: 'Schwinn Bike Tire',
    tutorial: tut3._id,
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    componentPart: 'FrontWheel'
  },
  {
    //13
    name:'Shimano GRX 600, FC-RX600-10, 46/30T, Hollowtech II 175mm',
    tutorial: null,
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    componentPart: 'Drivetrain'
  },
  {
    name:'Shimano GRX 400, FD-RX400, DownSwing, DownPull',
    tutorial: null,
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    componentPart: 'Drivetrain'
  },
  {
    name: 'Shimano Deore CN-HG54, 118 L',
    tutorial: null,
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    componentPart: 'Drivetrain'
  },
  {
    name: 'Ritchey WCS Butano blatte 44cm',
    tutorial: null,
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    componentPart: 'Cockpit'
  },
  {
    name: 'Ritchey WCS Toyon, blatte 100mm',
    tutorial: null,
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    componentPart: 'Cockpit'
  },
  {
    name: 'Selle Italia X3 Flow schwarz/schwarz',
    tutorial: null,
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    componentPart: 'Saddle'
  },
  {
    name: 'Schwalbe G-ONE Allround Perf., Classic Skin Race Guard, TL Easy, Addix, fold, Classic Skin 700x38C',
    tutorial: null,
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    componentPart: 'FrontWheel'
  },
  {
    name: 'Shimano CS-HG-500, 11-34',
    tutorial: null,
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    componentPart: 'Drivetrain'
  },
  {
    name: 'Shimano GRX 400, RD-RX400-10, Shadow Plus',
    tutorial: null,
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    componentPart: 'Drivetrain'
  },
  {
    name: 'Xtreme Gel-Comfort schwarz',
    tutorial: tut5,
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    componentPart: 'Cockpit'
  },
  {
    //23
    name: 'ROSE Race Attack SP-63XL, Aluminium, Offset 23 mm, schw/matt 27,2mm',
    tutorial: null,
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    componentPart: 'Saddle'
  },
  {
    name: 'Brand-X RD-01 Road Bike Frameset',
    tutorial: tut6,
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    componentPart: 'Frame'
  },
  {
    name: 'Schwinn Bicycle Chain',
    tutorial: tut7,
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    componentPart: 'Drivetrain'
  },
  {
    name: 'Shimano PD-R7000',
    tutorial: null,
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    componentPart: 'Pedals'
  }
]);

let pedals = db.bikecomponents.find({name: 'Shimano PD-R7000'})[0];

let dummyParts = db.bikecomponents.find({});

db.brands.insert([
  { name: 'Hoprider' },
  { name: 'Elops' },
  { name: 'Riverside' },
  { name: 'Tilt' },
  { name: 'Decathlon' },
  { name: 'Rockrider' },
  { name: 'Van Rysel' },
  { name: 'Triban' },
  { name: 'Rose' },
  { name: 'Cube' },
  { name: 'Canyon' },
  { name: 'Giant' },
]);

let rose = db.brands.find({ name: 'Rose' })[0];
let cube = db.brands.find({ name: 'Cube' })[0];
let canyon = db.brands.find({ name: 'Canyon' })[0];
let hoprider = db.brands.find({ name: 'Hoprider' })[0];
let elops = db.brands.find({ name: 'Elops' })[0];
let riverside = db.brands.find({ name: 'Riverside' })[0];
let tilt = db.brands.find({ name: 'Tilt' })[0];
let decathlon = db.brands.find({ name: 'Decathlon' })[0];
let rockrider = db.brands.find({ name: 'Rockrider' })[0];
let vanrysel = db.brands.find({ name: 'Van Rysel' })[0];
let triban = db.brands.find({ name: 'Triban' })[0];
let giant = db.brands.find({ name: 'Giant' })[0];

db.bikes.insert([
  {
    name: 'Rose BACKROAD AL GRX RX400',
    description: 'Das Alu-Gravelbike mit kompromisslosem Design zum fairen Preis',
    imageUrl: 'https://www.rosebikes.de/images/Twx04IQxDgwSMdpuBs9sU04qglLK7ZGQGXfnNqVdDpY/resize:fit:1920:0:1/gravity:no/bG9jYWw6Ly8vY21zL2Ntcy41ZjNjZTk4YmFiYjE1OS4yNTU5MDE4My5qcGVn.webp',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: gravelBikeType._id,
    brand: rose._id,
    components: [dummyParts[9]._id, dummyParts[11]._id, dummyParts[12]._id, dummyParts[8]._id, dummyParts[13]._id, dummyParts[14]._id,dummyParts[15]._id, dummyParts[16]._id, dummyParts[17]._id, dummyParts[18]._id, dummyParts[19]._id, dummyParts[20]._id, dummyParts[21]._id,
      dummyParts[22]._id, dummyParts[23]._id, dummyParts[24]._id, dummyParts[25]._id],
  },
  {
    name: 'Rose BACKROAD GRX RX600 1X11',
    description: 'Vielseitiges Carbon-Gravelbike für dein nächstes Offroad-Abenteuer',
    imageUrl:
      'https://www.rosebikes.de/images/MrJeeskDZIxqwEP-XLbdAWfHazWuHab7F7PvcnATP7U/resize:fit:800:0:1/gravity:no/background:ffffff/aHR0cHM6Ly9pbWFnZXMucm9zZWJpa2VzLmRlL2dldF9pbWFnZS8_dD01ODFBN0MzRjgyNEJENTkzRDQ1MzAxODg4OTEwMDQ3Mw.webp',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: gravelBikeType._id,
    brand: rose._id,
  },
  {
    name: 'Rose BACKROAD GRX RX600',
    description: 'Vielseitiges Carbon-Gravelbike für dein nächstes Offroad-Abenteuer',
    imageUrl:
      'https://www.rosebikes.de/images/MrJeeskDZIxqwEP-XLbdAWfHazWuHab7F7PvcnATP7U/resize:fit:800:0:1/gravity:no/background:ffffff/aHR0cHM6Ly9pbWFnZXMucm9zZWJpa2VzLmRlL2dldF9pbWFnZS8_dD01ODFBN0MzRjgyNEJENTkzRDQ1MzAxODg4OTEwMDQ3Mw.webp',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: gravelBikeType._id,
    brand: rose._id,
  },
  {
    name: 'Canyon Spectral 29 CF 7',
    description:
      'Das brandneue Spectral 29 CF 7 ist dank der Laufräder in 29 Zoll und der progressiven Geometrie schneller und vielseitiger als je zuvor. Mehr Speed und Kontrolle auf allen Trails. Das perfekte Trail Bike für jeden Tag.',
    imageUrl:
      'https://www.canyon.com/dw/image/v2/BCML_PRD/on/demandware.static/-/Sites-canyon-master/default/dwcf1ca722/images/full/full_2021_/2021/full_2021_spectral-cf-29-7_2687_bk-bk_P5.png?sw=1060&sh=1060&sm=fit&sfrm=png',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: mountainBikeType._id,
    brand: canyon._id,
    components: [dummyParts[25]._id, dummyParts[24]._id,dummyParts[9]._id, dummyParts[11]._id, dummyParts[12]._id, dummyParts[0]._id, dummyParts[8]._id],
  },
  {
    name: 'Canyon Spectral 29 CF 8',
    description:
      'Das brandneue Spectral 29 CF 7 ist dank der Laufräder in 29 Zoll und der progressiven Geometrie schneller und vielseitiger als je zuvor. Mehr Speed und Kontrolle auf allen Trails. Das perfekte Trail Bike für jeden Tag.',
    imageUrl:
      'https://www.canyon.com/dw/image/v2/BCML_PRD/on/demandware.static/-/Sites-canyon-master/default/dw8781edf1/images/full/full_2021_/2021/full_2021_spectral-cf-29-8_2688_gn-bk_P5.png?sw=1060&sh=1060&sm=fit&sfrm=png',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: mountainBikeType._id,
    brand: canyon._id,
    components: [dummyParts[25]._id, dummyParts[24]._id, dummyParts[0]._id, dummyParts[9]._id, dummyParts[11]._id, dummyParts[12]._id, dummyParts[8]._id],
  },
  {
    name: 'Cube AMS 100 C:68 SL 29',
    description:
      'Das Training erfolgreich beendet, alle Strava KOMs souverän eingesackt? Dann ist es jetzt Zeit für ein Bike, das allerhöchsten Ansprüchen genügt. Eins wie das extrem leistungsstarke AMS 100 C:68 SL 29 mit seinem Newmen Carbon Cockpit und Newmen Evolution Laufrädern (tubeless-ready). Die legendären Shimano XT Komponenten bieten bei den Gängen einen weiten übersetzungsbereich und bei den Bremsen unglaublich direkte Verzögerung. Maximale Kontrolle? Aber sicher doch! Und zwar dank Fox 32 Float Gabel und Float DPS EVOL Dämpfer, die jeweils vom Lenker aus bedient werden können. Und jetzt! Schnell! Los!',
    imageUrl: 'https://www.cube.eu/media_ftp/BIKE_Bilder_2021/452300/452300_light_zoom.jpg',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: mountainBikeType._id,
    brand: cube._id,
    components: [dummyParts[9]._id, dummyParts[11]._id, dummyParts[12]._id, dummyParts[0]._id, dummyParts[8]._id],
  },
  {
    name: 'Cube AMS 100 C:68 SLT 29',
    description:
      'Jetzt gibt’s keine Ausreden mehr - unser Meisterwerk AMS 100 C:68 SLT 29 ist die perfekte Rennmaschine, seine Lieblingsdisziplin: absolute Höchstgeschwindigkeiten. Mit der Sram XX1 Eagle AXS Schaltung wechselt man die 12 Gänge schnell, präzise, leicht und: kabellos! Dabei verzögern hydraulische Sram Level Ultimate Scheibenbremsen die leichten und robusten Newmen Advanced Laufräder und supergriffigen Schwalbe Reifen unglaublich zuverlässig und direkt. Und dank dem Fox Factory Fahrwerk mit 32 Float Step-Cast Gabel und DPS EVOL Dämpfer - beide mit edler Kashima Beschichtung und vom Lenker aus bedienbar - bleiben bei diesem Bike auch in Sachen Fahrkomfort und Kontrolle keine Wünsche offen. Damit macht man sich jeden Race Kurs oder Trail in Nullkommanichts Untertan.',
    imageUrl: 'https://www.cube.eu/media_ftp/BIKE_Bilder_2021/452400/452400_light.jpg',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: mountainBikeType._id,
    brand: cube._id,
    components: [dummyParts[9]._id, dummyParts[11]._id, dummyParts[12]._id, dummyParts[0]._id, dummyParts[8]._id],
  },
  {
    name: 'City Bike 28 Zoll Hoprider 7 Nexus 8',
    imageUrl: 'https://contents.mediadecathlon.com/p1638722/k$7f48b58bd7cfc6569ff4956c199a741e/sq/City+Bike+28+Zoll+Hoprider+7+Nexus+8.jpg',
    description: 'Extrem bequemes und sehr gut ausgestattetes City-Fahrrad für regelmäßige Fahrten auch in bergigeren Gegenden.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: cityBike._id,
    brand: hoprider._id,
  },
  {
    name: 'City Bike 28 Zoll Elops 520 LF Damen rot',
    imageUrl: 'https://contents.mediadecathlon.com/p1810909/k$3b7a4856ea078db16544c31fa550b6b2/sq/City+Bike+28+Zoll+Elops+520+LF+Damen+rot.jpg',
    description: 'Unser Team hat dieses Modell für regelmäßige, entspannte Fahrten in der Stadt entwickelt.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: cityBike._id,
    brand: elops._id,
  },
  {
    name: 'City Bike 28 Zoll Elops 540 LF Damen petrolblau',
    imageUrl: 'https://contents.mediadecathlon.com/p1862101/k$2afed5a14930d20b348c05604f59762c/sq/City+Bike+28+Zoll+Elops+540+LF+Damen+petrolblau.jpg',
    description: 'Für entspannte Fahrten in der Stadt mit hohem Komfort! Gut ausgestattet mit vielen praktischen Details.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: cityBike._id,
    brand: elops._id,
  },
  {
    name: 'City Bike 28 Zoll Elops 540 LF Damen petrolblau',
    imageUrl: 'https://contents.mediadecathlon.com/p1862101/k$2afed5a14930d20b348c05604f59762c/sq/City+Bike+28+Zoll+Elops+540+LF+Damen+petrolblau.jpg',
    description: 'Für entspannte Fahrten in der Stadt mit hohem Komfort! Gut ausgestattet mit vielen praktischen Details.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: cityBike._id,
    brand: elops._id,
  },
  {
    name: 'City Bike 28 Zoll Elops 520 LF Damen grün',
    imageUrl: 'https://contents.mediadecathlon.com/p1819372/k$14c8f3c6c7e5cb53b1b23a72e9639f1b/sq/City+Bike+28+Zoll+Elops+520+LF+Damen+gr+n.jpg',
    description: 'Unser Team hat dieses Modell für regelmäßige, entspannte Fahrten in der Stadt entwickelt.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: cityBike._id,
    brand: elops._id,
  },
  {
    name: 'City Bike 28 Zoll Elops 520 LF Damen grün',
    imageUrl: 'https://contents.mediadecathlon.com/p1819372/k$14c8f3c6c7e5cb53b1b23a72e9639f1b/sq/City+Bike+28+Zoll+Elops+520+LF+Damen+gr+n.jpg',
    description: 'Unser Team hat dieses Modell für regelmäßige, entspannte Fahrten in der Stadt entwickelt.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: cityBike._id,
    brand: elops._id,
  },
  {
    name: 'City Bike 26/28 Zoll Elops 520 LF Damen hellblau',
    imageUrl: 'https://contents.mediadecathlon.com/p1819326/k$98c36d9eacda925545daab704c623868/sq/City+Bike+26+28+Zoll+Elops+520+LF+Damen+hellblau.jpg',
    description: 'Unser Team hat dieses Modell für regelmäßige, entspannte Fahrten in der Stadt entwickelt.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: cityBike._id,
    brand: elops._id,
  },
  {
    name: 'City Bike 28 Zoll Elops 520 LF Damen Limited Edition Muttertag',
    imageUrl: 'https://contents.mediadecathlon.com/p2017618/k$3f7788a334c2ed2bbbed548f5bd73466/sq/City+Bike+28+Zoll+Elops+520+LF+Damen+Limited+Edition+Muttertag.jpg',
    description: 'Dieses City Bike ist mit Korb, Gepäckträgern, Schutzblechen, integrierter Beleuchtung und vielem mehr ausgestattet: ideal für kurze Fahrten in der Stadt.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: cityBike._id,
    brand: elops._id,
  },
  {
    name: 'City Bike 28 Zoll Hoprider 7 Nexus 8',
    imageUrl: 'https://contents.mediadecathlon.com/p1638722/k$7f48b58bd7cfc6569ff4956c199a741e/sq/City+Bike+28+Zoll+Hoprider+7+Nexus+8.jpg',
    description: 'Extrem bequemes und sehr gut ausgestattetes City-Fahrrad für regelmäßige Fahrten auch in bergigeren Gegenden.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: cityBike._id,
    brand: elops._id,
  },
  {
    name: 'City Bike 28 Zoll Elops 520 LF Damen Limited Edition Muttertag',
    imageUrl: 'https://contents.mediadecathlon.com/p2017618/k$3f7788a334c2ed2bbbed548f5bd73466/sq/City+Bike+28+Zoll+Elops+520+LF+Damen+Limited+Edition+Muttertag.jpg',
    description: 'Dieses City Bike ist mit Korb, Gepäckträgern, Schutzblechen, integrierter Beleuchtung und vielem mehr ausgestattet: ideal für kurze Fahrten in der Stadt.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: cityBike._id,
    brand: elops._id,
  },
  {
    name: 'City Bike 28-Zoll Elops Speed 920 schwarz',
    imageUrl: 'https://contents.mediadecathlon.com/p1906814/k$100aa898574b32195cf14c736f4e98f8/sq/City+Bike+28+Zoll+Elops+Speed+920+schwarz.jpg',
    description: 'Das City Bike Elops Speed 920 ist mit seinem sportlichen, dynamischen Design auf Schnelligkeit ausgelegt und ideal für Fahrten in der Stadt.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: cityBike._id,
    brand: elops._id,
  },
  {
    name: 'City Bike 28 Zoll Elops 520 LF Damen blau',
    imageUrl: 'https://contents.mediadecathlon.com/p1810879/k$84359c74560817d43d0af670f643b908/sq/City+Bike+28+Zoll+Elops+520+LF+Damen+blau.jpg',
    description: 'Unser Team hat dieses Modell für regelmäßige, entspannte Fahrten in der Stadt entwickelt.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: cityBike._id,
    brand: elops._id,
  },
  {
    name: 'City Bike 26/28 Zoll Elops 520 LF Damen hellblau',
    imageUrl: 'https://contents.mediadecathlon.com/p1819326/k$98c36d9eacda925545daab704c623868/sq/City+Bike+26+28+Zoll+Elops+520+LF+Damen+hellblau.jpg',
    description: 'Unser Team hat dieses Modell für regelmäßige, entspannte Fahrten in der Stadt entwickelt.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: cityBike._id,
    brand: elops._id,
  },
  {
    name: 'City Bike 28 Zoll Elops Speed 500 Singlespeed/Fixie blau',
    imageUrl: 'https://contents.mediadecathlon.com/p1741281/k$61ddc3b21ba0839b4194728fef039cdb/sq/City+Bike+28+Zoll+Elops+Speed+500+Singlespeed+Fixie+blau.jpg',
    description: 'Schnelles, wendiges Singlespeed-Bike für die Stadt, von Radfahrern entwickelt. Perfekter Fixie-Look und volle Funktionalität für deine Touren in der Stadt!',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: cityBike._id,
    brand: elops._id,
  },

  {
    name: 'E-Bike City Bike 28 Zoll Elops 920E LF Damen Brose Drive T weiß',
    imageUrl: 'https://contents.mediadecathlon.com/p1268794/k$b25c6f49d3c3f59147493c0d4a0e38b5/sq/E+Bike+City+Bike+28+Zoll+Elops+920E+LF+Damen+Brose+Drive+T+wei.jpg',
    description: 'Dieses E-Bike wurde für zusätzliche Power auf Fahrten in der Stadt und auf Fahrradtouren entwickelt. Ein kleiner Anschub, wenn du in die Pedale trittst!',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: eBike._id,
    brand: elops._id,
  },
  {
    name: 'E-Bike City Bike 28 Zoll Elops 120E schwarz',
    imageUrl: 'https://contents.mediadecathlon.com/p1886648/k$8b840279e11fdb8b93578c2640d64a5a/sq/E+Bike+City+Bike+28+Zoll+Elops+120E+schwarz.jpg',
    description: 'Dieses E-Bike ist mit Gepäckträger, Schutzblechen, integrierter Beleuchtung und vielem mehr ausgestattet und ist damit ideal für kurze Fahrten in der Stadt.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: eBike._id,
    brand: elops._id,
  },
  {
    name: 'E-Bike City Bike 28 Zoll Elops 900E HF Herren dunkelblau',
    imageUrl: 'https://contents.mediadecathlon.com/p1941571/k$6cd3ad55a91cdb64c16270b1b0a1ec34/sq/E+Bike+City+Bike+28+Zoll+Elops+900E+HF+Herren+dunkelblau.jpg',
    description: 'E-Bike für bequemes Fahrradfahren in der Stadt ‚Äì ohne große Anstrengungen!',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: eBike._id,
    brand: elops._id,
  },
  {
    name: 'E-Bike City Bike 28 Zoll Riverside City Nexus 8 Active Plus 400 Wh AVS',
    imageUrl: 'https://contents.mediadecathlon.com/p1878502/k$0bd312b585d9f89e10e4c88bc16875d7/sq/E+Bike+City+Bike+28+Zoll+Riverside+City+Nexus+8+Active+Plus+400+Wh+AVS.jpg',
    description: 'Berge, Gegenwind oder schwere Taschen sind kein Problem mehr - der kraftvolle BOSCH-Antrieb unterstützt Sie in jeder Situation.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: eBike._id,
    brand: riverside._id,
  },
  {
    name: 'E-Bike City Bike 28 Zoll Riverside City Nexus 8 Active Plus 400 Wh AVS',
    imageUrl: 'https://contents.mediadecathlon.com/p1878502/k$0bd312b585d9f89e10e4c88bc16875d7/sq/E+Bike+City+Bike+28+Zoll+Riverside+City+Nexus+8+Active+Plus+400+Wh+AVS.jpg',
    description: 'Berge, Gegenwind oder schwere Taschen sind kein Problem mehr - der kraftvolle BOSCH-Antrieb unterstützt Sie in jeder Situation.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: eBike._id,
    brand: riverside._id,
  },
  {
    name: 'E-Bike City Bike 28 Zoll Riverside City Nexus 8 Active Plus 400 Wh AVS',
    imageUrl: 'https://contents.mediadecathlon.com/p1878502/k$0bd312b585d9f89e10e4c88bc16875d7/sq/E+Bike+City+Bike+28+Zoll+Riverside+City+Nexus+8+Active+Plus+400+Wh+AVS.jpg',
    description: 'Berge, Gegenwind oder schwere Taschen sind kein Problem mehr - der kraftvolle BOSCH-Antrieb unterstützt Sie in jeder Situation.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: eBike._id,
    brand: riverside._id,
  },
  {
    name: 'E-Bike City Bike 28 Zoll Riverside City Nexus 8 Active Plus PT 400 Wh',
    imageUrl: 'https://contents.mediadecathlon.com/p1965676/k$5097a05168922275d837c65b13074770/sq/E+Bike+City+Bike+28+Zoll+Riverside+City+Nexus+8+Active+Plus+PT+400+Wh.jpg',
    description: 'Berge, Gegenwind oder schwere Taschen sind kein Problem mehr - der kraftvolle BOSCH-Antrieb unterstützt Sie in jeder Situation.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: eBike._id,
    brand: riverside._id,
  },
  {
    name: 'E-Bike City Bike 28 Zoll Riverside City Nexus 8 Active Plus PT 400 Wh',
    imageUrl: 'https://contents.mediadecathlon.com/p1965676/k$5097a05168922275d837c65b13074770/sq/E+Bike+City+Bike+28+Zoll+Riverside+City+Nexus+8+Active+Plus+PT+400+Wh.jpg',
    description: 'Berge, Gegenwind oder schwere Taschen sind kein Problem mehr - der kraftvolle BOSCH-Antrieb unterstützt Sie in jeder Situation.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: eBike._id,
    brand: riverside._id,
  },
  {
    name: 'E-Bike City Bike 28 Zoll Elops 900E LF Damen dunkelblau',
    imageUrl: 'https://contents.mediadecathlon.com/p1941507/k$3389b37fcf807dbc271b1fcdedf01807/sq/E+Bike+City+Bike+28+Zoll+Elops+900E+LF+Damen+dunkelblau.jpg',
    description: 'E-Bike für bequemes Fahrradfahren in der Stadt ‚Äì ohne große Anstrengungen!',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: eBike._id,
    brand: elops._id,
  },
  {
    name: 'E-Bike City Bike 28 Zoll Riverside City Nexus 8 Active Plus PT 400 Wh',
    imageUrl: 'https://contents.mediadecathlon.com/p1965676/k$5097a05168922275d837c65b13074770/sq/E+Bike+City+Bike+28+Zoll+Riverside+City+Nexus+8+Active+Plus+PT+400+Wh.jpg',
    description: 'Berge, Gegenwind oder schwere Taschen sind kein Problem mehr - der kraftvolle BOSCH-Antrieb unterstützt Sie in jeder Situation.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: eBike._id,
    brand: riverside._id,
  },
  {
    name: 'E-Bike Faltrad Klapprad 20 Zoll Tilt 500E schwarz',
    imageUrl: 'https://contents.mediadecathlon.com/p1824769/k$22260b537884fb59d660d59af5f9279d/sq/E+Bike+Faltrad+Klapprad+20+Zoll+Tilt+500E+schwarz.jpg',
    description: 'Für alle, die regelmäßig mit dem Fahrrad unterwegs sind und sich dabei etwas Unterstützung wünschen: Das TILT 500E lässt sich super kompakt zusammenfalten.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: eBike._id,
    brand: tilt._id,
  },
  {
    name: 'E-Bike Faltrad Klapprad 20 Zill Tilt 500E schwarzgrau',
    imageUrl: 'https://contents.mediadecathlon.com/p2011062/k$4396938c12e7bc02d21f93def5231f0c/sq/E+Bike+Faltrad+Klapprad+20+Zill+Tilt+500E+schwarzgrau.jpg',
    description: 'Für alle, die regelmäßig mit dem Fahrrad unterwegs sind und sich dabei etwas Unterstützung wünschen: Das TILT 500E lässt sich super kompakt zusammenfalten.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: eBike._id,
    brand: tilt._id,
  },
  {
    name: 'E-Bike Faltrad Klapprad 20 Zoll Tilt 500E blau',
    imageUrl: 'https://contents.mediadecathlon.com/p2017018/k$444cb5b3ad0f72ff36ae12848571c706/sq/E+Bike+Faltrad+Klapprad+20+Zoll+Tilt+500E+blau.jpg',
    description: 'Für alle, die regelmäßig mit dem Fahrrad unterwegs sind und sich dabei etwas Unterstützung wünschen: Das TILT 500E lässt sich super kompakt zusammenfalten.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: eBike._id,
    brand: tilt._id,
  },
  {
    name: 'E-Bike Trekkingrad 28 Zoll Riverside Active Plus Damen PT 400 Wh',
    imageUrl: 'https://contents.mediadecathlon.com/p1924483/k$1778c4cece420251d345c7e8f700a63b/sq/E+Bike+Trekkingrad+28+Zoll+Riverside+Active+Plus+Damen+PT+400+Wh.jpg',
    description: 'Berge, Gegenwind oder schwere Taschen sind kein Problem mehr - der kraftvolle BOSCH-Antrieb unterstützt Dich in jeder Situation.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: eBike._id,
    brand: riverside._id,
  },
  {
    name: 'E-Bike Trekkingrad 28 Zoll Riverside Active Plus Damen PT 400 Wh',
    imageUrl: 'https://contents.mediadecathlon.com/p1924483/k$1778c4cece420251d345c7e8f700a63b/sq/E+Bike+Trekkingrad+28+Zoll+Riverside+Active+Plus+Damen+PT+400+Wh.jpg',
    description: 'Berge, Gegenwind oder schwere Taschen sind kein Problem mehr - der kraftvolle BOSCH-Antrieb unterstützt Dich in jeder Situation.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: eBike._id,
    brand: riverside._id,
  },
  {
    name: 'E-Bike Trekkingrad 28 Zoll Riverside Active Plus Damen PT 400 Wh',
    imageUrl: 'https://contents.mediadecathlon.com/p1924483/k$1778c4cece420251d345c7e8f700a63b/sq/E+Bike+Trekkingrad+28+Zoll+Riverside+Active+Plus+Damen+PT+400+Wh.jpg',
    description: 'Berge, Gegenwind oder schwere Taschen sind kein Problem mehr - der kraftvolle BOSCH-Antrieb unterstützt Dich in jeder Situation.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: eBike._id,
    brand: riverside._id,
  },
  {
    name: 'E-Bike Trekkingrad 28 Zoll Riverside Active Plus Herren PT 400 Wh',
    imageUrl: 'https://contents.mediadecathlon.com/p1924988/k$0d5a9fb8a69a2d89dcaa76c310e61d6a/sq/E+Bike+Trekkingrad+28+Zoll+Riverside+Active+Plus+Herren+PT+400+Wh.jpg',
    description: 'Berge, Gegenwind oder schwere Taschen sind kein Problem mehr - der kraftvolle BOSCH-Antrieb unterstützt Dich in jeder Situation.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: eBike._id,
    brand: riverside._id,
  },
  {
    name: 'E-Bike Trekkingrad 28 Zoll Riverside Active Plus Herren PT 400 Wh',
    imageUrl: 'https://contents.mediadecathlon.com/p1924988/k$0d5a9fb8a69a2d89dcaa76c310e61d6a/sq/E+Bike+Trekkingrad+28+Zoll+Riverside+Active+Plus+Herren+PT+400+Wh.jpg',
    description: 'Berge, Gegenwind oder schwere Taschen sind kein Problem mehr - der kraftvolle BOSCH-Antrieb unterstützt Dich in jeder Situation.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: eBike._id,
    brand: riverside._id,
  },
  {
    name: 'E-Bike Cross Bike 28 Zoll Riverside 540E blau/grau',
    imageUrl: 'https://contents.mediadecathlon.com/p1953749/k$3c4803e9ef02ee1dd4572a47f374caf2/sq/E+Bike+Cross+Bike+28+Zoll+Riverside+540E+blau+grau.jpg',
    description: 'Mit diesem E-Bike schaffst du selbst längere Strecken mit starken Steigungen in kürzerer Zeit. Für Straßen und Wege geeignet.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: eBike._id,
    brand: riverside._id,
  },
  {
    name: 'E-Bike Cross Bike 28 Zoll Riverside 540E blau/grau',
    imageUrl: 'https://contents.mediadecathlon.com/p1953749/k$3c4803e9ef02ee1dd4572a47f374caf2/sq/E+Bike+Cross+Bike+28+Zoll+Riverside+540E+blau+grau.jpg',
    description: 'Mit diesem E-Bike schaffst du selbst längere Strecken mit starken Steigungen in kürzerer Zeit. Für Straßen und Wege geeignet.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: eBike._id,
    brand: riverside._id,
  },
  {
    name: 'E-Bike Trekkingrad 28 Zoll Riverside Perf Line Herren 400 Wh anthrazit/blau',
    imageUrl: 'https://contents.mediadecathlon.com/p1963292/k$67f2f2e029a7e2a46b7dffb5f629415d/sq/E+Bike+Trekkingrad+28+Zoll+Riverside+Perf+Line+Herren+400+Wh+anthrazit+blau.jpg',
    description: 'Berge, Gegenwind oder schwere Taschen sind kein Problem mehr - der kraftvolle BOSCH-Antrieb untersützt dich in jeder Situation.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: eBike._id,
    brand: riverside._id,
  },
  {
    name: 'E-Bike Trekkingrad 28 Zoll Riverside Perf Line Herren 400 Wh anthrazit/blau',
    imageUrl: 'https://contents.mediadecathlon.com/p1963292/k$67f2f2e029a7e2a46b7dffb5f629415d/sq/E+Bike+Trekkingrad+28+Zoll+Riverside+Perf+Line+Herren+400+Wh+anthrazit+blau.jpg',
    description: 'Berge, Gegenwind oder schwere Taschen sind kein Problem mehr - der kraftvolle BOSCH-Antrieb untersützt dich in jeder Situation.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: eBike._id,
    brand: riverside._id,
  },
  {
    name: 'E-Bike 28 Zoll Trekkingrad Riverside 500 Perf Line Damen 400 Wh anthrazit/blau',
    imageUrl: 'https://contents.mediadecathlon.com/p1963274/k$36d80edcef40a33d42cfd43596ac85ec/sq/E+Bike+28+Zoll+Trekkingrad+Riverside+500+Perf+Line+Damen+400+Wh+anthrazit+blau.jpg',
    description: 'Berge, Gegenwind oder schwere Taschen sind kein Problem mehr - der kraftvolle BOSCH-Antrieb untersützt Sie in jeder Situation.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: eBike._id,
    brand: riverside._id,
  },
  {
    name: 'E-Bike 28 Zoll Trekkingrad Riverside 500 Perf Line Damen 400 Wh anthrazit/blau',
    imageUrl: 'https://contents.mediadecathlon.com/p1963274/k$36d80edcef40a33d42cfd43596ac85ec/sq/E+Bike+28+Zoll+Trekkingrad+Riverside+500+Perf+Line+Damen+400+Wh+anthrazit+blau.jpg',
    description: 'Berge, Gegenwind oder schwere Taschen sind kein Problem mehr - der kraftvolle BOSCH-Antrieb untersützt Sie in jeder Situation.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: eBike._id,
    brand: riverside._id,
  },
  {
    name: 'E-Bike 28 Zoll Trekkingrad Riverside 500 Perf Line Damen 400 Wh anthrazit/blau',
    imageUrl: 'https://contents.mediadecathlon.com/p1963274/k$36d80edcef40a33d42cfd43596ac85ec/sq/E+Bike+28+Zoll+Trekkingrad+Riverside+500+Perf+Line+Damen+400+Wh+anthrazit+blau.jpg',
    description: 'Berge, Gegenwind oder schwere Taschen sind kein Problem mehr - der kraftvolle BOSCH-Antrieb untersützt Sie in jeder Situation.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: eBike._id,
    brand: riverside._id,
  },
  {
    name: 'E-Bike Cross Bike 28 Zoll Riverside 500E grün',
    imageUrl: 'https://contents.mediadecathlon.com/p1967171/k$387b15687bcb6da7c7833a7ec77e322b/sq/E+Bike+Cross+Bike+28+Zoll+Riverside+500E+gr+n.jpg',
    description: 'Mit diesem E-Bike schaffst du längere Strecken in kürzerer Zeit. Für den regelmäßigen Einsatz auf Straßen und Wegen geeignet.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: eBike._id,
    brand: riverside._id,
  },
  {
    name: 'E-Bike Cross Bike 28 Zoll Riverside 500E grau/grün',
    imageUrl: 'https://contents.mediadecathlon.com/p1922090/k$805ed784f8e4ec853c5b9939e4f67366/sq/E+Bike+Cross+Bike+28+Zoll+Riverside+500E+grau+gr+n.jpg',
    description: 'Mit diesem E-Bike schaffst du längere Strecken in kürzerer Zeit. Für den regelmäßigen Einsatz auf Straßen und Wegen geeignet.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: eBike._id,
    brand: riverside._id,
  },
  {
    name: 'E-Bike Cross Bike 28 Zoll Riverside 500E grau/grün',
    imageUrl: 'https://contents.mediadecathlon.com/p1922090/k$805ed784f8e4ec853c5b9939e4f67366/sq/E+Bike+Cross+Bike+28+Zoll+Riverside+500E+grau+gr+n.jpg',
    description: 'Mit diesem E-Bike schaffst du längere Strecken in kürzerer Zeit. Für den regelmäßigen Einsatz auf Straßen und Wegen geeignet.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: eBike._id,
    brand: riverside._id,
  },
  {
    name: 'E-Bike Cross Bike 28 Zoll Riverside 500E grün',
    imageUrl: 'https://contents.mediadecathlon.com/p1967171/k$387b15687bcb6da7c7833a7ec77e322b/sq/E+Bike+Cross+Bike+28+Zoll+Riverside+500E+gr+n.jpg',
    description: 'Mit diesem E-Bike schaffst du längere Strecken in kürzerer Zeit. Für den regelmäßigen Einsatz auf Straßen und Wegen geeignet.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: eBike._id,
    brand: riverside._id,
  },
  {
    name: 'Faltrad Klapprad 20 Zoll TILT 100',
    imageUrl: 'https://contents.mediadecathlon.com/p1820202/k$512c57cad1be142f92bc428ba45b3dc6/sq/Faltrad+Klapprad+20+Zoll+TILT+100.jpg',
    description: 'Willst du das schöne Wetter genießen und einen Fahrradausflug machen? Dein Tilt 100 ist in kürzester Zeit im Kofferraum verstaut und du kannst ins Grüne fahren.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: klapprad._id,
    brand: tilt._id,
  },
  {
    name: 'Faltrad Klapprad 20 Zoll Tilt 120 rot',
    imageUrl: 'https://contents.mediadecathlon.com/p1820204/k$e36f10c96ca9d1538d76b9f624f5d769/sq/Faltrad+Klapprad+20+Zoll+Tilt+120+rot.jpg',
    description: 'Wenn du regelmäßig die Möglichkeiten der Intermodalität ausnutzen möchtest: kombiniere dein Tilt 120 mit einem anderen Transportmittel (Auto, Zug, Bus,...).',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: klapprad._id,
    brand: tilt._id,
  },
  {
    name: 'Faltrad Klapprad 20 Zoll Tilt 120 grau',
    imageUrl: 'https://contents.mediadecathlon.com/p1820203/k$cc377f9887d86092ad3d9b2e7fa63414/sq/Faltrad+Klapprad+20+Zoll+Tilt+120+grau.jpg',
    description: 'Wenn du regelmäßig die Möglichkeiten der Intermodalität ausnutzen möchtest: kombiniere dein Tilt 120 mit einem anderen Transportmittel (Auto, Zug, Bus,...).',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: klapprad._id,
    brand: tilt._id,
  },
  {
    name: 'Faltrad Klapprad 20 Zoll Tilt 500 neonorange',
    imageUrl: 'https://contents.mediadecathlon.com/p1820125/k$01c80cc2507187bf24fa24a5a69fdb1a/sq/Faltrad+Klapprad+20+Zoll+Tilt+500+neonorange.jpg',
    description: 'Ob beim Pendeln oder auf Reisen: Das Tilt 500 lässt sich perfekt mit anderen Transportmittel wie Auto, Zug, Bus oder Wohnmobil kombinieren.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: klapprad._id,
    brand: tilt._id,
  },

  {
    name: 'E-Mountainbike 29 Zoll RR 720 Performance Line Gen3 400 Wh',
    imageUrl: 'https://contents.mediadecathlon.com/p1883413/k$4b1bc700688b55c6a56950cdce2be803/sq/E+Mountainbike+29+Zoll+RR+720+Performance+Line+Gen3+400+Wh.jpg',
    description: 'Ein Tritt ins Pedal, und die Kraft ist da: Die Performance Line ist der Antrieb für Touren E-Biker. ENJOY THE FLOW!!!',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: eBike._id,
    brand: decathlon._id,
  },
  {
    affiliateLink: 'https://www.awin1.com/pclick.php?p=26815469307&a=794017&m=14353',
    name: 'E-Mountainbike 29 Zoll RR 720 Performance Line Gen3 400 Wh',
    imageUrl: 'https://contents.mediadecathlon.com/p1883413/k$4b1bc700688b55c6a56950cdce2be803/sq/E+Mountainbike+29+Zoll+RR+720+Performance+Line+Gen3+400+Wh.jpg',
    description: 'Ein Tritt ins Pedal, und die Kraft ist da: Die Performance Line ist der Antrieb für Touren E-Biker. ENJOY THE FLOW!!!',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: eBike._id,
    brand: decathlon._id,
  },
  {
    name: 'E-Bike Mountainbike RR 900 Performance Bosch CX 500 WH 29" Herren',
    imageUrl: 'https://contents.mediadecathlon.com/p1879079/k$2bd21c701c115e5a0e1b94384bfc8660/sq/E+Bike+Mountainbike+RR+900+Performance+Bosch+CX+500+WH+29+Herren.jpg',
    description: 'E-MTB RR 900 Performance CX 500WH anthrazit',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: eBike._id,
    brand: decathlon._id,
  },
  {
    name: 'E-Bike Mountainbike RR 900 Performance Bosch CX 500 WH 29" Herren',
    imageUrl: 'https://contents.mediadecathlon.com/p1879079/k$2bd21c701c115e5a0e1b94384bfc8660/sq/E+Bike+Mountainbike+RR+900+Performance+Bosch+CX+500+WH+29+Herren.jpg',
    description: 'E-MTB RR 900 Performance CX 500WH anthrazit',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: eBike._id,
    brand: decathlon._id,
  },
  {
    name: 'E-Bike Mountainbike RR 900 Performance Bosch CX 500 WH 29" Herren',
    imageUrl: 'https://contents.mediadecathlon.com/p1879079/k$2bd21c701c115e5a0e1b94384bfc8660/sq/E+Bike+Mountainbike+RR+900+Performance+Bosch+CX+500+WH+29+Herren.jpg',
    description: 'E-MTB RR 900 Performance CX 500WH anthrazit',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: eBike._id,
    brand: decathlon._id,
  },
  {
    name: 'E-Mountainbike E-ST 100 27,5 Zoll blau',
    imageUrl: 'https://contents.mediadecathlon.com/p1863837/k$ef402fa4c1b6270d783701c05a73b863/sq/E+Mountainbike+E+ST+100+27+5+Zoll+blau.jpg',
    description: 'E-MTB für Touren in hügeligem Gelände.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: eBike._id,
    brand: rockrider._id,
  },
  {
    name: 'MTB ST 100 27,5 Zoll grau',
    imageUrl: 'https://contents.mediadecathlon.com/p1276519/k$13d043f6eb2db637f37478db517dbb67/sq/MTB+ST+100+27+5+Zoll+grau.jpg',
    description: 'Dieses MTB mit 27,5 Zoll ist für deine ersten MTB Touren bis 90 min Dauer konzipiert. Ideal bei trockenem Wetter.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: mountainBikeType._id,
    brand: rockrider._id,
  },
  {
    name: 'MTB ST 100 27,5 Zoll grau',
    imageUrl: 'https://contents.mediadecathlon.com/p1276519/k$13d043f6eb2db637f37478db517dbb67/sq/MTB+ST+100+27+5+Zoll+grau.jpg',
    description: 'Dieses MTB mit 27,5 Zoll ist für deine ersten MTB Touren bis 90 min Dauer konzipiert. Ideal bei trockenem Wetter.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: mountainBikeType._id,
    brand: rockrider._id,
  },
  {
    name: 'Mountainbike ST-530 27,5 Zoll schwarz',
    imageUrl: 'https://contents.mediadecathlon.com/p1863845/k$335de7abe4db4c78ddf5d92e604935dc/sq/Mountainbike+ST+530+27+5+Zoll+schwarz.jpg',
    description: '27,5 Zoll Rad für MTB Touren zu jeder Jahreszeit (2 bis 3 Std.).',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: mountainBikeType._id,
    brand: rockrider._id,
  },
  {
    name: 'RENNRAD RACING EDR CF 105 DISC schwarz',
    imageUrl: 'https://contents.mediadecathlon.com/p1990117/k$7467acde0744506d36672726878cac01/sq/RENNRAD+RACING+EDR+CF+105+DISC+schwarz.jpg',
    description: 'Dieses ultraleistungsstarke Rennrad aus der EDR-Reihe (EnDuRance) mit neuem Rahmen wurde für Experten entwickelt, die ein Rad für jede Tour suchen.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: racingBike._id,
    brand: vanrysel._id,
    components: [dummyParts[10]._id]
  },
  {
    name: 'RENNRAD RACING EDR CF 105 DISC schwarz',
    imageUrl: 'https://contents.mediadecathlon.com/p1990117/k$7467acde0744506d36672726878cac01/sq/RENNRAD+RACING+EDR+CF+105+DISC+schwarz.jpg',
    description: 'Dieses ultraleistungsstarke Rennrad aus der EDR-Reihe (EnDuRance) mit neuem Rahmen wurde für Experten entwickelt, die ein Rad für jede Tour suchen.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: racingBike._id,
    brand: vanrysel._id,
    components: [dummyParts[10]._id]

  },
  {
    name: 'RENNRAD EDR AF 105 schwarz',
    imageUrl: 'https://contents.mediadecathlon.com/p1829874/k$a7142a8f155aca59b9b55620a5ad2128/sq/RENNRAD+EDR+AF+105+schwarz.jpg',
    description: 'Unser neues Aluminiumfahrrad begleitet dich auf deinen sportlichen Touren. Das EDR AF 105 bietet ein subtiles Gleichgewicht aus Nervosität und Komfort.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: racingBike._id,
    brand: vanrysel._id,
    components: [dummyParts[10]._id]
  },
  {
    name: 'Rennrad Ultra 940 CF Ultegra Di2 blau',
    imageUrl: 'https://contents.mediadecathlon.com/p1624658/k$6fbf9c093917d89a43dac6f58b76c264/sq/Rennrad+Ultra+940+CF+Ultegra+Di2+blau.jpg',
    description: 'Das Ultra CF Ultegra Di2 ist das Prunkstück unseres Ultra-Sortiments und lässt dich von der Präzision und vom Komfort einer elektrischen Schaltung profitieren.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: racingBike._id,
    brand: vanrysel._id,
    components: [dummyParts[10]._id]
  },
  {
    name: 'RENNRAD EDR CF ULTEGRA DISC schwarz',
    imageUrl: 'https://contents.mediadecathlon.com/p1990127/k$18bf27aa7df41d3f81a89205627c7a57/sq/RENNRAD+EDR+CF+ULTEGRA+DISC+schwarz.jpg',
    description: 'Dieses ultraleistungsstarke Rennrad aus der EDR-Reihe (EnDuRance) mit neuem Rahmen wurde für Experten entwickelt, die ein Rad für jede Tour suchen.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: racingBike._id,
    brand: vanrysel._id,
  },
  {
    name: 'RENNRAD EDR CF ULTEGRA DISC schwarz',
    imageUrl: 'https://contents.mediadecathlon.com/p1990127/k$18bf27aa7df41d3f81a89205627c7a57/sq/RENNRAD+EDR+CF+ULTEGRA+DISC+schwarz.jpg',
    description: 'Dieses ultraleistungsstarke Rennrad aus der EDR-Reihe (EnDuRance) mit neuem Rahmen wurde für Experten entwickelt, die ein Rad für jede Tour suchen.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: racingBike._id,
    brand: vanrysel._id,
    components: [dummyParts[10]._id]
  },
  {
    name: 'RENNRAD EDR CF ULTEGRA DISC schwarz',
    imageUrl: 'https://contents.mediadecathlon.com/p1990127/k$18bf27aa7df41d3f81a89205627c7a57/sq/RENNRAD+EDR+CF+ULTEGRA+DISC+schwarz.jpg',
    description: 'Dieses ultraleistungsstarke Rennrad aus der EDR-Reihe (EnDuRance) mit neuem Rahmen wurde für Experten entwickelt, die ein Rad für jede Tour suchen.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: racingBike._id,
    brand: vanrysel._id,
  },
  {
    name: 'RENNRAD EDR CF ULTEGRA DISC rot',
    imageUrl: 'https://contents.mediadecathlon.com/p1994252/k$e47e48557b136e06b76c02b0436c69ad/sq/RENNRAD+EDR+CF+ULTEGRA+DISC+rot.jpg',
    description: 'Dieses ultraleistungsstarke Rennrad aus der EDR-Reihe (EnDuRance) mit neuem Rahmen wurde für Experten entwickelt, die ein Rad für jede Tour suchen.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: racingBike._id,
    brand: vanrysel._id,
  },
  {
    name: 'RENNRAD EDR CF ULTEGRA DISC rot',
    imageUrl: 'https://contents.mediadecathlon.com/p1994252/k$e47e48557b136e06b76c02b0436c69ad/sq/RENNRAD+EDR+CF+ULTEGRA+DISC+rot.jpg',
    description: 'Dieses ultraleistungsstarke Rennrad aus der EDR-Reihe (EnDuRance) mit neuem Rahmen wurde für Experten entwickelt, die ein Rad für jede Tour suchen.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: racingBike._id,
    brand: vanrysel._id,
  },
  {
    name: 'RENNRAD HERREN RC100 SLICK EDITION',
    imageUrl: 'https://contents.mediadecathlon.com/p2051375/k$144d8064cced62c10eda716a50a55ee0/sq/RENNRAD+HERREN+RC100+SLICK+EDITION.jpg',
    description: 'DAS Rennrad für Einsteiger: die bequemen Reifen, die einfache Schaltung und der gekrümmter Lenker machen es ideal für flaches und leicht hügliges Gelände.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: racingBike._id,
    brand: triban._id,
  },
  {
    name: 'RENNRAD HERREN RC100 SLICK EDITION',
    imageUrl: 'https://contents.mediadecathlon.com/p2051375/k$144d8064cced62c10eda716a50a55ee0/sq/RENNRAD+HERREN+RC100+SLICK+EDITION.jpg',
    description: 'DAS Rennrad für Einsteiger: die bequemen Reifen, die einfache Schaltung und der gekrümmter Lenker machen es ideal für flaches und leicht hügliges Gelände.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: racingBike._id,
    brand: triban._id,
  },
  {
    name: 'RENNRAD HERREN RC100 SLICK EDITION',
    imageUrl: 'https://contents.mediadecathlon.com/p2051375/k$144d8064cced62c10eda716a50a55ee0/sq/RENNRAD+HERREN+RC100+SLICK+EDITION.jpg',
    description: 'DAS Rennrad für Einsteiger: die bequemen Reifen, die einfache Schaltung und der gekrümmter Lenker machen es ideal für flaches und leicht hügliges Gelände.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: racingBike._id,
    brand: triban._id,
  },
  {
    name: 'RENNRAD HERREN RC100 SLICK EDITION',
    imageUrl: 'https://contents.mediadecathlon.com/p2051375/k$144d8064cced62c10eda716a50a55ee0/sq/RENNRAD+HERREN+RC100+SLICK+EDITION.jpg',
    description: 'DAS Rennrad für Einsteiger: die bequemen Reifen, die einfache Schaltung und der gekrümmter Lenker machen es ideal für flaches und leicht hügliges Gelände.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: racingBike._id,
    brand: triban._id,
  },
  {
    name: 'TRIBAN RC500 FLATBAR',
    imageUrl: 'https://contents.mediadecathlon.com/p1614865/k$adcb5aee7ea52acabeb6fa29f077608d/sq/TRIBAN+RC500+FLATBAR.jpg',
    description: 'Dieses Rennrad wurde für regelmäßige Touren entwickelt. Es bietet maximalen Komfort für weite, häufige Strecken.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: racingBike._id,
    brand: triban._id,
  },
  {
    name: 'Rennrad RC 120 Scheibenbremse marineblau/orange',
    imageUrl: 'https://contents.mediadecathlon.com/p1614863/k$083fae8f560f240065985baf92b60d67/sq/Rennrad+RC+120+Scheibenbremse+marineblau+orange.jpg',
    description: 'Mit diesem Rennrad machst du schnell Fortschritte. Durch seine Vielseitigkeit und die 2 x 8 Gänge ist es für jede Strecke geeignet.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: racingBike._id,
    brand: triban._id,
  },
  {
    name: 'Cross Bike 28 Zoll Riverside 920 dunkelgrau',
    imageUrl: 'https://contents.mediadecathlon.com/p1499572/k$b24d167490401e508d38a17b1ed4e6ce/sq/Cross+Bike+28+Zoll+Riverside+920+dunkelgrau.jpg',
    description: "Auf geht's in die Natur! Unser Team hat das Riverside 920 für ausgedehnte Touren auf Straßen und Wegen entwickelt.",
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: crossBike._id,
    brand: riverside._id,
  },
  {
    name: 'Cross Bike 28 Zoll Riverside 900 Alu grün',
    imageUrl: 'https://contents.mediadecathlon.com/p1845505/k$c77e9688ec84e0dddd3a7e2b250ae820/sq/Cross+Bike+28+Zoll+Riverside+900+Alu+gr+n.jpg',
    description: "Auf geht's in die Natur! Unser Team hat das Cross Trekkingrad Riverside 900 für ausgedehnte Touren auf Straßen und Wegen entwickelt.",
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: crossBike._id,
    brand: riverside._id,
  },
  {
    name: 'Cross Bike 28 Zoll Riverside 500 grün',
    imageUrl: 'https://contents.mediadecathlon.com/p1990168/k$d69656b3c8efb170d8a772bb2f3f3481/sq/Cross+Bike+28+Zoll+Riverside+500+gr+n.jpg',
    description: 'Von unserem Entwicklungsteam für regelmäßige Touren bis 50km entwickelt',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: crossBike._id,
    brand: riverside._id,
  },
  {
    name: 'Cross Bike 28 Zoll Riverside 500 grün',
    imageUrl: 'https://contents.mediadecathlon.com/p1990168/k$d69656b3c8efb170d8a772bb2f3f3481/sq/Cross+Bike+28+Zoll+Riverside+500+gr+n.jpg',
    description: 'Von unserem Entwicklungsteam für regelmäßige Touren bis 50km entwickelt',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: crossBike._id,
    brand: riverside._id,
  },
  {
    name: 'Trekkingrad 28 Zoll Hoprider 500 LF Damen lila',
    imageUrl: 'https://contents.mediadecathlon.com/p1817992/k$4703bd00f83ec3a5e69542ca60a0aa65/sq/Trekkingrad+28+Zoll+Hoprider+500+LF+Damen+lila.jpg',
    description: 'Für regelmäßige Fahrten in und außerhalb der Stadt. Das Fahrrad ist für Strecken über 10km konzipiert.',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: trekkingBike._id,
    brand: hoprider._id,
  },
  {
    name: 'Giant TCR Advanced LTD 1 (2015)',
    imageUrl: 'https://www.thebikelist.co.uk/images/models/Giant/2015/tcr-advanced-1/Main.jpg',
    description: 'TCR Advanced provides an excellent balance of stiffness and low weight. The perfect all-rounder for training and racing. The frame is handmade in our own factory Giant, from knitting fibers to stick stickers! The excellent rigidity contributes Power Core centered Mega Drivedown tube and Over Drive steerer tube. Of course there is preparation for ANT + sensor. Currently no other brand does not offer so perfectly balanced road bike - low weight and excellent rigidity (supported by tests).',
    creationDate: new Date(),
    lastUpdatedDate: new Date(),
    bikeType: racingBike._id,
    brand: giant._id,
    components: [pedals._id]
  },
]);
