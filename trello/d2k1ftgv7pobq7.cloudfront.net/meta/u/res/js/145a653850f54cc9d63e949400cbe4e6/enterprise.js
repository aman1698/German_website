$((function(){$('a[href^="#"]').on("click",(function(e){e.preventDefault();var t=$($(this).attr("href")).offset().top-$("body > header").outerHeight();$("html,body").animate({scrollTop:t},300)})),$("#features").on("click",".feature",(function(){$(this).hasClass("expanded")?$(this).removeClass("expanded"):($("#features .feature.expanded").removeClass("expanded"),$(this).addClass("expanded"))}));var e=0;$("#features .feature").each((function(){$(this).outerHeight()>e&&(e=$(this).outerHeight())})).each((function(){$(this).css("minHeight",e)}));var t=$("html"),s=$(document);s.on("scroll",(function(){s.scrollTop()>99?t.addClass("scroll"):t.removeClass("scroll")})),s.scroll()}));