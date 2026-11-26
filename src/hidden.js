/**
 * hidden.js
 *
 * Detalles para el curioso que abre la consola (F12). Invisible para el resto.
 */

const isEs = () => {
  const docLang = document.documentElement.lang;
  if (docLang === 'es' || docLang === 'en') return docLang === 'es';
  try {
    return localStorage.getItem('portfolio-lang') === 'es';
  } catch {
    return false;
  }
};

const banner = (es) =>
  es
    ? String.raw`
   [AMS]
   ┌──────────────────────────────┐
   │  si estás leyendo esto,      │
   │  somos de la misma especie.  │
   └──────────────────────────────┘
`
    : String.raw`
   [AMS]
   ┌──────────────────────────────┐
   │  if you're reading this,     │
   │  we speak the same language. │
   └──────────────────────────────┘
`;

export function installHidden() {
  let initialEs = false;
  try {
    initialEs = localStorage.getItem('portfolio-lang') === 'es';
  } catch {
    initialEs = false;
  }

  const style = 'color:#6FD08C;font-family:monospace;font-size:12px;line-height:1.3';
  console.log('%c' + banner(initialEs), style);
  console.log(
    initialEs
      ? '%cEdge AI · visión artificial · IoT. Prueba %cams.help()%c en esta consola.'
      : '%cEdge AI · computer vision · IoT. Try %cams.help()%c in this console.',
    'color:#a3a3a3;font-family:monospace',
    'color:#FFE27A;font-family:monospace',
    'color:#a3a3a3;font-family:monospace'
  );

  const commands = {
    help: () => console.log('ams.about() · ams.stack() · ams.hire() · ams.amstech()'),
    about: () =>
      console.log(
        isEs()
          ? 'Alejandro Martín Sánchez, ingeniero de software. From silicon to the cloud, every layer matters.'
          : 'Alejandro Martín Sánchez, software engineer. From silicon to the cloud, every layer matters.'
      ),
    stack: () =>
      console.table({
        hw: 'ESP32 · Jetson · RPi',
        fw: 'MQTT · Modbus · I2C · RS-485',
        ai: 'CNN · OpenCV · TFLite',
        be: 'Java · Spring · Python · Go',
        fe: 'Angular · TypeScript · Android',
      }),
    hire: () => {
      console.log(
        isEs() ? '%c✓ permiso concedido' : '%c✓ permission granted',
        'color:#6FD08C;font-weight:bold'
      );
      window.location.hash = '#contact';
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      return isEs() ? 'te espero en el pie de la página.' : 'see you at the bottom of the page.';
    },
    amstech: () => window.open('https://amstech.dev', '_blank', 'noopener'),
  };
  Object.defineProperty(window, 'ams', { value: commands, configurable: true });
}
