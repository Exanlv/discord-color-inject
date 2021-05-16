const Color = require('color');

const lighten = {
    '--brand-experiment-100': 99,
    '--brand-experiment-160': 90,
    '--brand-experiment-200': 81,
    '--brand-experiment-230': 72,
    '--brand-experiment-260': 63,
    '--brand-experiment-300': 54,
    '--brand-experiment-330': 45,
    '--brand-experiment-360': 36,
    '--brand-experiment-400': 27,
    '--brand-experiment-430': 18,
    '--brand-experiment-460': 9,
}

const darken = {
    '--brand-experiment': 0,
    '--brand-experiment-500': 7.6,
    '--brand-experiment-530': 15.2,
    '--brand-experiment-560': 22.8,
    '--brand-experiment-600': 29.4,
    '--brand-experiment-630': 37,
    '--brand-experiment-660': 44.6,
    '--brand-experiment-700': 52.2,
    '--brand-experiment-730': 59.8,
    '--brand-experiment-760': 67.4,
    '--brand-experiment-800': 75,
    '--brand-experiment-830': 82.6,
    '--brand-experiment-860': 90.2,
    '--brand-experiment-900': 97.8,
}

const opacity = {
    '--brand-experiment-05a': 5,
    '--brand-experiment-10a': 10,
    '--brand-experiment-15a': 15,
    '--brand-experiment-20a': 20,
    '--brand-experiment-25a': 25,
    '--brand-experiment-30a': 30,
    '--brand-experiment-35a': 35,
    '--brand-experiment-40a': 40,
    '--brand-experiment-45a': 45,
    '--brand-experiment-50a': 50,
    '--brand-experiment-55a': 55,
    '--brand-experiment-60a': 60,
    '--brand-experiment-65a': 65,
    '--brand-experiment-70a': 70,
    '--brand-experiment-75a': 75,
    '--brand-experiment-80a': 80,
    '--brand-experiment-85a': 85,
    '--brand-experiment-90a': 90,
    '--brand-experiment-95a': 95,
}

const baseColor = Color(process.argv[2] || '#7289da');

for (let i in lighten) {
    lighten[i] = baseColor.lighten(lighten[i] / 100).hex();
}

for (let i in darken) {
    darken[i] = baseColor.darken(darken[i] / 100).hex();
}

for (let i in opacity) {
    let arr = baseColor.opaquer(opacity[i]).rgb().array();
    arr.push(opacity[i] / 100);

    opacity[i] = `rgba(${arr.join(', ')})`;
}

console.log('[data-popout-root].newBrand, html.newBrand {');

for (let i in lighten) {
    console.log(`\t${i}: ${lighten[i]};`);
}

for (let i in darken) {
    console.log(`\t${i}: ${darken[i]};`);
}

for (let i in opacity) {
    console.log(`\t${i}: ${opacity[i]};`);
}

console.log('\t--font-display: Whitney,"Helvetica Neue",Helvetica,Arial,sans-serif;');

console.log('}');