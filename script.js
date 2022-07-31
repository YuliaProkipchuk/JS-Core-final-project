$(function () {
    let positionsLeft = [];
    let positionsTop = [];
    let masleft = [];
    let ind = 0;
    let gameStart = 0;
    let check = true;
    masleft.length = 16;
    let count = false;
    let newLeft;
    $('.fragment').each(function (index, element) {
        positionsLeft[index] = $(this).css('left');
        positionsTop[index] = $(this).css('top');


    });
    

    $('.fragment').each(function (index, element) {
        newLeft = Math.round(Math.random() * 15);
        for (let j = 0; j < masleft.length;) {
            if (masleft[j] != newLeft) {
                j++;
                continue;
            }
            else {
                newLeft = Math.round(Math.random() * 15);
                j = 0;
                count = true;
            }
            count = false;
        }
        $(this).css('left', positionsLeft[newLeft]);
        $(this).css('top', positionsTop[newLeft]);
        masleft[ind] = newLeft;
        ind++;
        $('.fragment').draggable({
            grid: [125, 125],
            start: function () {
                startGame();
            }

        });
    });
    let timer;
    function startGame() {
        let  sec = 0, mins = 1, chek = 0;
        if (gameStart == 0) {
            timer = setInterval(() => {
                if (sec == 0) {
                    sec = 60;
                    mins--;
                }
                sec--;
                if (mins < 10) {
                    if (chek == 0) {
                        mins = '0' + mins;
                        chek++;
                    }
                }
                if (sec < 10) {
                    sec = '0' + sec;
                }
                if (sec == 0 && mins == 0) {
                    clearInterval(timer);
                    $('.modal').addClass('show');
                    $('.check-btn').prop('disabled', true);
                    $('.start-btn').prop('disabled', true);
                    $('.check').removeClass('show');
                    $('.text').text("It's a pity, but you lost");
                }
                $('.time').text(`${mins}:${sec}`);
                $('.span-time').text(`${mins}:${sec}`);
            }, 1000);
            $('.start-btn').prop('disabled', true);
            $('.check-btn').prop('disabled', false);
            gameStart++;
        }
    }
    $('.start-btn').click(function () {
        startGame();
    });
    $('.new-btn').click(function () {
        clearInterval(timer);
        $('.check').addClass('show');
        $('.text').html(`You still have time, you sure? <span class="span-time">01:00</span>`)
        $('.time').text(`01:00`);
       
        masleft.splice(0, masleft.length);
        masleft.length = 16;
        $('.fragment').each(function (index, element) {

            newLeft = Math.round(Math.random() * 15);
            for (let j = 0; j < masleft.length;) {
                if (masleft[j] != newLeft) {
                    j++;
                    continue;
                }
                else {
                    newLeft = Math.round(Math.random() * 15);
                    j = 0;
                    count = true;
                }
                count = false;
            }
            $(this).css('left', positionsLeft[newLeft]);
            $(this).css('top', positionsTop[newLeft]);
            masleft[ind] = newLeft;
            ind++;
        });
        $('.start-btn').prop('disabled', false);
        $('.check-btn').prop('disabled', true);
        gameStart = 0;
    });
    $('.close').click(function () {
        $('.modal').removeClass('show');
    })
    $('.check-btn').click(function () {
        $('.modal').addClass('show');
        

    })
    $('.check').click(function () {
        $('.check-btn').prop('disabled', true);
        $('.check').removeClass('show');
        for (let i = 0; i < positionsLeft.length; i++) {
            if (positionsLeft[i] != `${parseInt($('.fragment').eq(i).css('left')) - 625}px` || positionsTop[i] != `${parseInt($('.fragment').eq(i).css('top'))}px`) {
                check = false;
                break;
            }
        }
        if (check) {
            $('.text').text('Woohoo, well done, you did it!');
        }
        else {
            $('.text').text("It's a pity, but you lost");
        }
        clearInterval(timer);
        check = true;
    })
})
