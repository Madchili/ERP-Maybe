Då ger jag officiellt upp!

JAG HAR INTKLUDERAT EN KORT VIDEO I ZIP-Filen också

Jag har publicerat hemsidan på "https://erp-maybe.vercel.app/userform"
Cors problemet mellan min server och front end försvinner inte trots explicit kod för att kringå detta detta

const corsOptions = {
  origin: ['https://erp-maybe.vercel.app', 'https://erp-maybeoneday-6dfo.onrender.com', 'http://localhost:3000'],
  optionsSuccessStatus: 200
};

Jag har även testat generella app.use(cors());

Backend och server ligger på render:
Server : https://erp-maybeoneday-6dfo.onrender.com (Men det blir ju såklart bara error)
Databasen gick bra att publicera och att ansluta till från pgAdmin 4. Jag kunde skapa tables och allt där. Allt är skapat med samma instruktioner som jag hade att skapa min fungerande lokala databas. Kolumnerna finns men jag har ju inte möjlighet att programmatiskt lägga till någon data pga nedan random problem.

Render klarar inte av att publicera en statisk hemsida med next.js. Den kan helt enkelt inte hantera det. Vercel kan dock hantera next.js och därför går den att publicera. Dock kommer jag då inte runt cors-problemet när jag sitter där.

Jag har fått min lokala front-end att koppla emot min server som i sin tur skall koppla emot databasen. Men vad jag än gör så får jag 50/50 mellan 2 olika problem som har samma effekt. Och detta är att servern crashar.

Problem 1:
  errno: -4077,
  code: 'ECONNRESET',
  syscall: 'read'

Problem 2:
  error: SSL/TLS required
  length: 37,
  severity: 'FATAL',
  code: '28000',

Det första problemet skall ha att göra med host-namnet som används för att koppla till databasen. Men jag har testat exakt alla varianter. Inklusive exakt samma som på videon på avancera.

Det andra problemet är bara en ren lögn (koden ljuger)
Jag har "?sslmode=require" i slutet av URL:en.

Och som sagt, problem 1 och 2 byter av varandra. SSL/TLS felet är inte alltid aktuellt.
Både min lokala och publicerade variant av servern har problem att kommunicera med databasen.

Den publicerade varianten av databasen får problemet
"Error: getaddrinfo ENOTFOUND dpg-cpk6pf20si5c73cldosg-a"
Jag använder mig av rätt URL och har kollat på flertalet forum som säger att detta ÄR rätt. Render skall vara enkelt.
"All of your services on Render can communicate internally on the same private network ."
DATABASE_URL på render är "postgres://erpuser:aH0X2BQjeOQUVqnjszZFfNNazRq2bKYK@dpg-cpk6pf20si5c73cldosg-a/erpdb_xycd"*
I enighet med vad render säger kring de tjänster man har publicerade på deras sida. Jag har också testat external URL. Och jag har testat att bryta ner pool infon till beståndsdelarna med separata host, user, password etc etc.

Att köra lokalt med min lokala server fungerar utmärkt. Det är bara buggar som jag behöver tid för att justera med hela order-item upplägget. Just nu så fungerar det inte som tänkt, jag vet vad som är fel men har lagt allt fokus på att försöka publicera.

Detta kan jag tyvärr inte visa trots att jag satt i nästan 10 timmar och försökte göra min lokala databas tillgänglig. Jag gick igenom port-forwarding, routade med IP adress, gav postgress acess till diverse externa IP adresser för att kunna kommunicera med min databas. När allt va sagt och gjort så fanns det 0 tecken på att det fanns någon som helst koppling mellan min publicerade server och lokala databas. Detta skall dock vara något som är möjligt, det var bara omöjligt för mig.
