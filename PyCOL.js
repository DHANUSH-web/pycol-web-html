// PyCOL by Dhanush H V
// to get the slider values
function getSliderValues()
{
    let r = parseInt(document.getElementById('RSlide').value);
    let g = parseInt(document.getElementById('GSlide').value);
    let b = parseInt(document.getElementById('BSlide').value);
    return [r, g, b];
}

// to get the spin box values
function getSpinBoxValues()
{
    let r = parseInt(document.getElementById("RSet").value);
    let g = parseInt(document.getElementById("GSet").value);
    let b = parseInt(document.getElementById("BSet").value);
    return [r, g, b];
}

// update sliders
function setSliderValues(color)
{
    document.getElementById('RSlide').value = color[0];
    document.getElementById('GSlide').value = color[1];
    document.getElementById('BSlide').value = color[2];
}

// update SpinBox
function setSpinBoxValues(color)
{
    document.getElementById("RSet").value = color[0];
    document.getElementById("GSet").value = color[1];
    document.getElementById("BSet").value = color[2];
}

// to get the hex color of a given value
function toHex(color)
{
    let hex = color.toString(16);

    return hex.length == 1 ? '0' + hex : hex;
}

// to get the approximate hex color
function getHex(color)
{
    return '#' + toHex(color[0]) + toHex(color[1]) + toHex(color[2]);
}

// to get the main colors
function getRGB(hex)
{
    if (hex.length == 6)
    {
        let r, g, b;

        r = hex.substring(0, 2);
        g = hex.substring(2, 4);
        b = hex.substring(4, 6);

        r = parseInt(r, 16);
        g = parseInt(g, 16);
        b = parseInt(b, 16);

        return [r, g, b];
    }

    else
        alert("Please enter a valid hex color code");
}

// to update all entities
function showColor()
{
    let color = getHex(getSliderValues()).toUpperCase();
    document.getElementById('hexCode').innerHTML = color;
    document.getElementById('showColor').style.backgroundColor = color;
}

// updates all the entity when sliders are triggerred
function triggerSlide(value, id)
{
    document.getElementById(id).value = value;
    showColor();
}

// to apply custom colors
function applyColor()
{
    let color = document.getElementById('userIn').value.toUpperCase();
    
    if (color.length > 1)
    {
        if (color[0] == '#')
        {
            if (color.length <= 7)
            {
                color = color.substring(1, color.length);
                let c = getRGB(color);
                setSliderValues(c);
                setSpinBoxValues(c);
                showColor();
            }

            else
                alert('Please enter a valid hex color code...');
        }

        else
        {
            color = color.split(' ');
            let r, g, b;
            r = parseInt(color[0]);
            g = parseInt(color[1]);
            b = parseInt(color[2]);

            setSliderValues([r, g, b]);
            setSpinBoxValues([r, g, b]);
            showColor();
        }
    }

    else
    {
        setSliderValues(getSpinBoxValues());
        showColor();
    }
}

function copyHexCode()
{
    let hex = getHex(getSliderValues()).toUpperCase();
    navigator.clipboard.writeText(hex);
    document.getElementById('hexCode').innerHTML = 'Copied ' + hex;
}

function copyRGB()
{
    let rgb = getSpinBoxValues();
    rgb = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    navigator.clipboard.writeText(rgb);
}

function generateRandomColors()
{
    let r = parseInt(Math.random() * 255);
    let g = parseInt(Math.random() * 255);
    let b = parseInt(Math.random() * 255);
    let hex = getHex([r, g, b]).toUpperCase();
    setSliderValues([r, g, b]);
    setSpinBoxValues([r, g, b]);
    showColor();
}

function notifier(string, sleep, on_click='None', new_window=true, close=true, grav='top', pos='left', stop_on_focus=false, bg_color='#2c3e50')
{
    Toastify({
        text: string,
        duration: sleep * 1000,
        className: 'info',
        destination: on_click,
        newWindow: new_window,
        close: close,
        gravity: grav,
        position: pos,
        stopOnFocus: stop_on_focus,
        style: {
            background: bg_color,
            fontWeight: 'bold',
            border: 'solid 2px black',
            borderRadius: '15px'
        },
        oldestFirst: false
    }).showToast();
}

function showKeys()
{
    const keys = "\nCtrl + P --> Apply Custom color\nCtrl + R --> Generate Random Color";
    notifier(string=keys, sleep=5, 'https://www.github.com/DHANUSH-web', pos='right', bg_color='#2c3e50');
}

// shortcut key to call generate random colos
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && String.fromCharCode(e.keyCode) == 'R') {
        e.preventDefault();
        e.stopPropagation();
        generateRandomColors();
    }
}, false);

document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && String.fromCharCode(e.keyCode) == 'C') {
        e.preventDefault();
        e.stopPropagation();
        copyHexCode(document.getElementById('hexCode').innerHTML);
    }
}, false);

document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && String.fromCharCode(e.keyCode) == 'P') {
        e.preventDefault();
        e.stopPropagation();
        applyColor();
    }
}, false);

document.addEventListener(
  "keydown",
  (e) => {
    if (e.shiftKey && e.ctrlKey && String.fromCharCode(e.keyCode) == "C") {
      e.preventDefault();
      e.stopPropagation();
      copyRGB();
    }
  },
  false
);

window.onload = function() {
    notifier(string="Welcom to PyCOL :)\n\nThis app is dedicated to my best friend Anna",
             sleep=7, on_click='https://s.amizone.net/', pos='right', bg_color='');
}