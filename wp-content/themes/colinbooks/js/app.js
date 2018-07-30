$.fancybox.defaults.buttons = [
    "close"
]

$.fancybox.defaults.infobar = false;

var $gallery = $('.gallery').isotope({
    // set itemSelector so .grid-sizer is not used in layout
    itemSelector: '.gallery-item',
    percentPosition: true,
    masonry: {
        // use element for option
        columnWidth: '.gallery-item'
    }
})

$gallery.one('arrangeComplete', function () {
    console.log('arrange done, just this one time');
});

$(document).ready(function () {
    $gallery.isotope();
    $gallery.addClass('active');

    // setup();
});

// P5 drawing on homepage only
if (window.location.pathname == '/') {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let drops = [];
    let angle = 0;
    let dropCount = 0;

    function startingX() {
        return random(-(width / 4), width + (width / 4));
    }

    function startingY() {
        return random(height) - height;
    }

    function setupDrops() {
        drops = [];

        for (let i = 0; i < dropCount; i++) {
            drops.push({
                x: startingX(),
                y: random(height) - height,
                velocity: random(8, 12),
                tail: random(6, 12),
            });
        }
    }

    function setup() {
        const canvas = createCanvas(width, height);
        canvas.parent('p5');
        frameRate(60);

        angle = random(-PI / 16, PI / 16);
        dropCount = random(0, width / 2);

        setupDrops();
    }


    function draw() {
        background(0);
        stroke(255, 255, 255, 64);
        for (let i = 0; i < drops.length; i++) {
            let tailX = drops[i].tail * sin(-angle) + drops[i].x;

            line(drops[i].x, drops[i].y, tailX, drops[i].y - drops[i].tail);
        }

        update();
    }

    function update() {
        for (let i = 0; i < drops.length; i++) {
            let newX = drops[i].tail * sin(angle) + drops[i].x;

            drops[i].x = newX;
            drops[i].y += drops[i].velocity;

            if (drops[i].y > (height + drops[i].tail)) {
                drops[i].x = startingX();
                drops[i].y = startingY();
            }
        }
    }

    function windowResized() {
        width = window.innerWidth;
        height = window.innerHeight;
        dropCount = random(0, width / 2);
        // setupDrops();
        resizeCanvas(windowWidth, windowHeight);
    }
}
