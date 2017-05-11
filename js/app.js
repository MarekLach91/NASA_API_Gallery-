$(function(){
    console.log('DOM!')
    
    var $section = $('section');
    var headerWidth; setHeaderWidth();  
//    ?????
    
    var $loader = $section.find('.loader');
    var $ul = $section.find('ul');
    var $next = $section.find('.next');
    var $prev = $section.find('.prev');
    var $nav = $section.find('nav');
    



function loadImage(type) {
        $.ajax({ 
            url: 'https://api.nasa.gov/planetary/apod?api_key=scXZq06Z33nnXYB5Zx48eTCWbAtFwm851zbFxeFN&date='+getRandomDate()
        }).done(function(response){
            console.log(response, type);
            var url = response.hdurl;
            if(typeof url !== 'undefined' && response.media_type === 'image') {
                var $image = $('<img>').attr('src', url);
                $image
                    .on('load', function(){
                        console.log('image load');

                        $loader.hide();
                        createImageElement(type, url);
                    })
                    .on('error', function(){
                        console.log('error!');
                    
                        error++;
                    
                        if(error > 5) {
                            alert('Nie mogę pobrać zdjęć');
                        } else {
                            setTimeout(function(){
                                loadImage(type);
                            }, 1000)
                        }
                    });

            } else {
                loadImage(type);
            }
            //console.log(response);
        }).fail(function(){
            alert('Nie mogę połączyć się z API NASA');
        });
    }
    