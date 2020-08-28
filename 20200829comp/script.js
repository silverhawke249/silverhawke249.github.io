let songlists = null;
const randomletters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?-';

function main() {
    fetch('songdata.json')
        .then(response => response.text())
        .then(text => load_data(text));
}

function load_data(json_string) {
    let data = JSON.parse(json_string);

    let param_string = location.search.slice(1);
    let param_pairs = param_string.split('&').map(p => p.split('='));
    let params = Object.fromEntries(param_pairs);

    let round_num = parseInt(params.round || "1") - 1;
    songlists = data[round_num].map(list => shuffle_array(list));

    document.getElementById("header").innerText = `SDVX Low Level Competition Round ${round_num + 1}`;
}

function shuffle_array(array) {
    let a = array.slice();

    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }

    return a;
}

function sample_array(array) {
    return array[Math.floor(Math.random() * array.length)]
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function randomize() {
    let current_song_pool = [];
    for (let songlist of songlists) {
        current_song_pool.push(songlist[songlist.length - 1]);
        current_song_pool.push(songlist[songlist.length - 2]);
    }

    console.log(current_song_pool);

    let cur_index = Math.floor(Math.random() * current_song_pool.length);
    let song_title = current_song_pool[cur_index];

    for (let songlist of songlists) {
        let index = songlist.indexOf(song_title);
        if (index >= 0) {
            songlist.splice(index, 1);
        }
    }

    let loop_len = [];
    let loop_min = 100, loop_max = 300;
    for (let i=0; i<song_title.length; i++) {
        loop_len.push(Math.floor(Math.random() * (loop_max - loop_min + 1)) + loop_min)
    }

    let counter = 0;
    let timer_func = function() {
        let all_done = true;

        let chars = [];
        for (let i = 0; i < loop_len.length; i++) {
            if (loop_len[i] > counter) {
                chars.push(sample_array(randomletters));
                all_done = false;
            } else {
                chars.push(song_title[i]);
            }
        }

        document.getElementById("songname").innerText = chars.join('');
        counter += 1;

        if (all_done) {
            clearInterval(timer_id);
        }
    };

    let timer_id = setInterval(timer_func, 10);
}