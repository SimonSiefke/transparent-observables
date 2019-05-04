## Einleitung

4 Teile:

- Einleitung
- Grundlagen Reactive Programming und Observables
- Konzept Transparent Observables
- Implementierung

### Excel

Nehmen wir als Beispiel Excel als Programmierumgebung / Programmiersprache.

Excel Oeffnen

Interessante Eigenschaft, dass Die Zellen automatisch updaten.

## Reactive Programming

- Seit letzter Zeit besonders beliebt bei Web Frameworks wie z.B. React, Angular, Vue, Svelte, Polymer, Marko

### Functional Reactive Programming

Das Verhalten wird bei der Deklaration der Variablen bestimmt, die Variable kann ihren Wert aendern, aber nicht irgendwo anders. Das hat den Vorteil, dass das Verhalten der Variable an einer Stelle anstatt an verschiedenen Stellen definiert, erleichtert Aenderungen im Code und verringert die Abhaengigkeit zwischen rauemlich getrennten Code Abschnitten.

### Back to definition

Als Transparent Observables bezeichne ich die Verwendung des Beobachter Musters für automatisch aktualisierende Variablen ohne explizit Beobachter-Subjekte zu kreieren und Beobachter an- oder abzumelden.

Die Grundlage fuer das Theme Transparent Observables besteht aus 2 Annahmen:

1. der meiste Code fuer Benutzeroberflaechen dynamisch ist und dafuer eignet sich am besten das Beobachter muster.
2. das Beobachter Muster zu verstehen und zu verwenden ist komplex oder zumindest komplexer als es sein sollte.

In Excel kann man sehr einfach die Beziehungen zwischen Zellen definieren, es macht keinen unterschied ob eine Zelle einen festen Wert hat oder durch eine Formel festgelegt ist,

dem Benutzer ist egal, wie die Variablen geupdated werden oder wie das Beobachter Muster funktioniert.

```js
function updateArea() {
  area = width * height
}
width = 10
height = 20
updateArea()
width = 40
updateArea()
```

oder es werden explizit beobachter objekte kreiert.

Reactive Extensions Beispiel.

Rx basiert auf der Idee

```js
width$ = observable(10)
height$ = observable(20)
area$ = combineLatest(width$, height$, function(width, height) {
  return width * height
})
```

Nehmen wir als Beispiel Spotify. Wenn ich auf play druecke, veraendert sich die Benuzteroberflaeche an 4 Stellen. Alle diese Komponenten haengen von dem Wert einer Variablen ab.

Beide Varianten sind nicht gut geeignet. Die erste nicht, weil Sie leicht Fehleranfaellig ist und die Abhaengigkeit zwischen den Komponeten gross ist Die zweite nicht, weil man sehr oft die selbe art von Code schreibt. Wie oft steht im Code updateDies updateDas observableDies observableDas.

Die alternative ist, das Beobachter Muster direkt in die Sprache zu integrieren, und eine andere Semantik, eine andere Denkweise zu kreieren.

Observables als Grundstein fuer Variablen. Alles sollte ein Observable sein.

Es sieht aus wie normaler Code, nur mit einer anderen Semantik. Der Code macht etwas anderes. Der Code macht mehr.

## Svelte

Das bringt mich zu letzter Woche, wo ich ein youtube video von Rich Harris mit dem Titel "Rethinking Reactivity" gesehen habe. Rich Harris arbeitet bei der NY Times und ist unter anderem fuer die RollupJS und SvelteJS in der Javascript Community bekannt. (falls jemand schon mal davon gehoehrt hat)

Es ging um genau das Konzept.

Zeige svelte Beispiel

Button

## Konzept

## Definition

Transparent Observables besteht aus 2 Teilen. Observables , auf deutsch beobachtbare-subjekte, beziehen sich auf das Beobachter Muster, das 1994 von Erich Gamma, .Richard Helm, Ralph Johnson und John Vlissides in dem Buch Design Patterns spezifiert wurde. Darin steht, dass die Intention des Beobachter Musters ist, eine 1 zu n Abhaengigkeit zwischen Objekten zu erstellen, sodass wenn ein Objekt seinen Zustand aendert, alle abhaengigen Objekte benachrichtigt werden und automatisch geupdated werden. Der Vorteil des Beobachter Musters ist, dass keine direkte Abhaengigkeit bei Beobachtern besteht. Und wenn weniger Abhaengigkeiten zwischen Komponenten besteht, macht das den Code einfacher zu verstehen und zu veraendern.

-- 20 min --

## Implementierung

Bis vor einer Woche habe ich versucht, genau so eine Programmiersprache zu entwickeln, bei der jede Variable ein Observable ist. Fuer die Syntax habe ich mich fuer Javascript entschieden, da ich bereits mit Javascript bekannt bin. Der Compiler/Transpiler, wie auch immer, ist wie folgt aufgebaut der erste schritt ist die generierung eines Abstrakten Syntax Baumes aus dem Source Code. Dafuer habe ich die Javascript bibliothek Babel verwendet.

source code:

```js
let x = 1
let y = x + 1
x = 5
```

erwarteter generierter Code:

```js
let x = observable(() => 1)
let y = observable(() => x + 1)
x.value = 5
```

der generierte code ist normales Javascript, wobei die observale funktion dafuer sorgt, dass die beobachter ueber updates benachrichtigt werden. Das passiert, indem man statt einer primitiven zuweisung eine Zuweisung Es ist durch Javascipt proxies geregelt.

## Ergebnisse

- Benutzeroberflaechen sind einfacher, da weniger Code und der Code deklarativer ist. Man beschreibt, was man haben will, anstatt wie man es genau machen will.

- nuetzlich fuer inkrementelle Compiler Angenommen wir haben eine Datei, die 190 538 Zeilen Source Code hat, den man von Compilieren will. Wenn man eine Variable aendert, muss man den ganzen Code neu Kompilieren. Wenn jede Variable ein Observable ist, reicht es nur die Variable upzudaten. Alles andere regelt sich von selbst. Das Konzept ist wiederum genau wie bei excel und wiederum besonders nuetzlich fuer die entwicklung von benuzteroberflaechen, weil man direkt sehen kann wie sich eine aendeurng auswirkt und das kann man normalerweise nicht am source code erkennen (z.B. Farben, Groessen, Abstaende)

## Moeglichkeiten

### Debugging & Live reloading

Wenn alles Observables sind

- reaktive server & websockets
- reaktive datenbanken
