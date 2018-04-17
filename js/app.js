$(document).ready(function() {
	const $mainNav = $('.home__navigation--main');
    const $mainNavHeight = $mainNav.height();
    const $search = $('.navigation--list-search');
    const $scrollTop = $(window).scrollTop();
  
    /* If the page has been scrolled down, and user reloads it, mainNav background color is not semi-transparent */
    if ($scrollTop > 0){
        $mainNav.css({
            'background-color': 'rgba(231, 131, 130)'
        });
    }

    /* Change opacity of navbar color while scrolling down */
	$(window).scroll(function() {
		const $scrolled = $(window).scrollTop();
		if ($scrolled > $mainNavHeight) {
			$mainNav.css({
				'background-color': 'rgba(231, 131, 130)'
			});
		} else {
			$mainNav.css({
				'background-color': 'rgba(231, 131, 130, 0.5)'
			});
		}
    });
 
     /* Hide icon search and show wider input field*/
    function showInput(e){
       e.preventDefault();
        if( $(this).hasClass('navigation--list-search') ){
            $( this ).removeClass('navigation--list-search');
            $( this ).addClass('navigation--list-clicked');
            $( this ).attr('placeholder','Your query'); /* Added placeholder attribute */
        }
        /* Hide hover color on parent link element */
        $ (this ).closest('a').css({
            'background':'none'
        })
    }

    /* Hide input and show icon search again*/

    function hideInput(e){
        const $input = $('.home__navigation--list input');

        /* Show search icon  when user presses Enter key */

        if(e.keyCode == '13'){
            if( $input.hasClass('navigation--list-clicked') ){
                $input.removeClass('navigation--list-clicked');
                $input.addClass('navigation--list-search');
                $input.removeAttr('placeholder',''); /* Removed placeholder attribute */
            }

            /* Reset input field */

            $input.val('').blur();

            /* Hiding hover color */
            hideHoverColor($input);
            
        }
    }
    /* Revert to default input hover styles */
    function hideHoverColor(input){
        input.closest('a').on('mouseover',function(){
            /* Hide hover color when input is focused */
            if( input.hasClass('navigation--list-clicked') ){
                $( this ).css({
                    'background' : 'transparent'
                 });
            } else{
                $( this ).css({
                    'background' : '#fce38a'
                 });
            } 
        })
        input.closest('a').on('mouseleave',function(){
            $( this ).css({
                'background' : 'transparent'
             });
        })
}

    /* Events */
    $search.on('click',showInput);
    $search.on('keyup',hideInput);

    /*Smooth Scroll */
    
    /* Only first five links are selected */
    $('.nav-link:lt(5)').on('click',smoothScroll);

    function removeActiveLink(){
        $('.nav-link').each( function(){
            $(this).removeClass('active');
        })
    }
    function smoothScroll(){
        removeActiveLink();
        const $sectionTo = $(this).attr('href');
        const $navHeight = $('nav').outerHeight();
        $('html,body').animate({
          scrollTop: $($sectionTo).offset().top - $navHeight - 20
        }, 1500);
        $(this).addClass('active');
    }

});
