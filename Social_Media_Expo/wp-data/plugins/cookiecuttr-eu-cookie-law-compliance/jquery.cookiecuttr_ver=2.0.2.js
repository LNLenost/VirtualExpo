/**
 * Copyright (C) 2012 Chris Wharton (chris@weare2ndfloor.com)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * THIS SOFTWARE AND DOCUMENTATION IS PROVIDED "AS IS," AND COPYRIGHT
 * HOLDERS MAKE NO REPRESENTATIONS OR WARRANTIES, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO, WARRANTIES OF MERCHANTABILITY OR
 * FITNESS FOR ANY PARTICULAR PURPOSE OR THAT THE USE OF THE SOFTWARE
 * OR DOCUMENTATION WILL NOT INFRINGE ANY THIRD PARTY PATENTS,
 * COPYRIGHTS, TRADEMARKS OR OTHER RIGHTS.COPYRIGHT HOLDERS WILL NOT
 * BE LIABLE FOR ANY DIRECT, INDIRECT, SPECIAL OR CONSEQUENTIAL
 * DAMAGES ARISING OUT OF ANY USE OF THE SOFTWARE OR DOCUMENTATION.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://gnu.org/licenses/>.
 
 Documentation available at http://cookiecuttr.com
 
 */
(function ($) {
    $.cookieCuttr = function (options) {

        var options = $.extend(defaults, options);
        var message = defaults.cookieMessage.replace('{{cookiePolicyLink}}', defaults.cookiePolicyLink);

        defaults.cookieMessage = 'We use cookies on this website, you can <a href="' + defaults.cookiePolicyLink + '" title="read about our cookies">read about them here</a>. To use the website as intended please...';
                
        //convert options
        var cookiePolicyLinkIn = options.cookiePolicyLink;
        var cookieCutter = options.cookieCutter;
        var cookieCutterDeclineOnly = options.cookieCutterDeclineOnly;
        var cookieAnalytics = options.cookieAnalytics; 
        var cookieDeclineButton = options.cookieDeclineButton; 
        var cookieAcceptButton = options.cookieAcceptButton;
        var cookieResetButton = options.cookieResetButton; 
        var cookieOverlayEnabled = options.cookieOverlayEnabled; 
        var cookiePolicyLink = options.cookiePolicyLink; 
        var cookieMessage = message;
        var cookieAnalyticsMessage = options.cookieAnalyticsMessage;
        var cookieErrorMessage = options.cookieErrorMessage;
        var cookieDisable = options.cookieDisable; 
        var cookieWhatAreTheyLink = options.cookieWhatAreTheyLink;
        var cookieAcceptButtonText = options.cookieAcceptButtonText;
        var cookieDeclineButtonText = options.cookieDeclineButtonText;
        var cookieResetButtonText = options.cookieResetButtonText;
        var cookieWhatAreLinkText = options.cookieWhatAreLinkText;
        var cookieNotificationLocationBottom = options.cookieNotificationLocationBottom;
        var cookiePolicyPageMessage = options.cookiePolicyPageMessage;       
        var cookieDiscreetLink = options.cookieDiscreetLink;
         var cookieDiscreetReset= options.cookieDiscreetReset;
        var cookieDiscreetLinkText = options.cookieDiscreetLinkText;
        var cookieDiscreetPosition = options.cookieDiscreetPosition; 
        var cookieNoMessage = options.cookieNoMessage; 

	var cookieAnalyticsId = options.cookieAnalyticsId;
	cookieDomain = options.cookieDomain;
        
        var cookiePolicyPage = $('input#cookiecuttr_privacypage').length == 1;
        if(cookiePolicyPage)
        {
            cookieDeclineButton = true;
            cookieAcceptButton = true;
        }

        // cookie identifier
        $.cookieCuttr.accepted = $.cookieCuttr.GetCookie('cc_cookie_accept') == "cc_cookie_accept";
        $.cookieCuttr.declined = $.cookieCuttr.GetCookie('cc_cookie_decline') == "cc_cookie_decline";


        var $cookieAccepted = $.cookieCuttr.GetCookie('cc_cookie_accept') == "cc_cookie_accept";
        $.cookieAccepted = function () {
            return $cookieAccepted;
        };

        var $cookieDeclined = $.cookieCuttr.GetCookie('cc_cookie_decline') == "cc_cookie_decline";
        $.cookieDeclined = function () {
            return $cookieDeclined;
        };

		// write cookie accept button
		if (cookieAcceptButton) {
		    var cookieAccept = ' <a href="#accept" class="cc-cookie-accept">'+cookieAcceptButtonText+'</a> ';
		} else {
		    var cookieAccept = "";
		}
		// write cookie decline button
		if (cookieDeclineButton) {
		    var cookieDecline = ' <a href="#decline" class="cc-cookie-decline">'+cookieDeclineButtonText+'</a> ';
		} else {
		    var cookieDecline = "";
		}
		
		// write extra class for overlay
		if (cookieOverlayEnabled) {
		    var cookieOverlay = 'cc-overlay';
		} else {
		    var cookieOverlay = "";
		}
		
		
        // to prepend or append, that is the question?
        		if( (cookieNotificationLocationBottom) || (cookieDiscreetPosition == "bottomright") || (cookieDiscreetPosition == "bottomleft") ) {
        			var appOrPre = true;
        		} else {
        			var appOrPre = false;
        		}
        
                if (($cookieAccepted) || ($cookieDeclined)) {
        			// write cookie reset button
        			if( (cookieResetButton) && (cookieDiscreetReset) ) {
        			
        			if(appOrPre) {
        				$('body').append('<div class="cc-cookies cc-discreet"><a class="cc-cookie-reset" href="#" title="'+ cookieResetButtonText +'">'+cookieResetButtonText+'</a></div>');
        			} else {
        				$('body').prepend('<div class="cc-cookies cc-discreet"><a class="cc-cookie-reset" href="#" title="'+ cookieResetButtonText +'">'+cookieResetButtonText+'</a></div>');
        			}
        			    //add appropriate CSS depending on position chosen
        			    if (cookieDiscreetPosition == "topleft") {
        			    	$('div.cc-cookies').css("top", "0");
        			    	$('div.cc-cookies').css("left", "0");
        			    }
        			    if (cookieDiscreetPosition == "topright") {
        			    	$('div.cc-cookies').css("top", "0");
        			    	$('div.cc-cookies').css("right", "0");
        			    }
        			    if (cookieDiscreetPosition == "bottomleft") {
        			    	$('div.cc-cookies').css("bottom", "0");
        			    	$('div.cc-cookies').css("left", "0");
        			    }
        			    if (cookieDiscreetPosition == "bottomright") {
        			    	$('div.cc-cookies').css("bottom", "0");
        			    	$('div.cc-cookies').css("right", "0");
        			    }
        			
        			
        			} else if(cookieResetButton) {
        				if(appOrPre) {
        			 		$('body').append('<div class="cc-cookies"><a href="#" class="cc-cookie-reset">'+cookieResetButtonText+'</a></div>');
        			 	} else {
        			 		$('body').prepend('<div class="cc-cookies"><a href="#" class="cc-cookie-reset">'+cookieResetButtonText+'</a></div>');
        			 	}
        			 } else {
        			     var cookieResetButton = "";
        			 }            
                } else {
        
                    // add message to just after opening body tag
                    
                    if( (cookieNoMessage)&& (!cookiePolicyPage) ) {
                     // show no link on any pages APART from the policy page
                    } else if ( (cookieDiscreetLink) && (!cookiePolicyPage) ) { // show discreet link
                    	if(appOrPre) {
                        	$('body').append('<div class="cc-cookies cc-discreet"><a href="' + cookiePolicyLinkIn + '" title="'+ cookieDiscreetLinkText +'">'+cookieDiscreetLinkText+'</a></div>');
                        } else {
                        	$('body').prepend('<div class="cc-cookies cc-discreet"><a href="' + cookiePolicyLinkIn + '" title="'+ cookieDiscreetLinkText +'">'+cookieDiscreetLinkText+'</a></div>');
                        }
                        //add appropriate CSS depending on position chosen
                        if (cookieDiscreetPosition == "topleft") {
                        	$('div.cc-cookies').css("top", "0");
                        	$('div.cc-cookies').css("left", "0");
                        }
                        if (cookieDiscreetPosition == "topright") {
                        	$('div.cc-cookies').css("top", "0");
                        	$('div.cc-cookies').css("right", "0");
                        }
                        if (cookieDiscreetPosition == "bottomleft") {
                        	$('div.cc-cookies').css("bottom", "0");
                        	$('div.cc-cookies').css("left", "0");
                        }
                        if (cookieDiscreetPosition == "bottomright") {
                        	$('div.cc-cookies').css("bottom", "0");
                        	$('div.cc-cookies').css("right", "0");
                        }
                    
                    } else if (cookieAnalytics) { // show analytics overlay
                    	if(appOrPre) {
                        	$('body').append('<div class="cc-cookies ' + cookieOverlay + '">' + cookieAnalyticsMessage + cookieAccept + cookieDecline + '<a href="' + cookieWhatAreTheyLink + '" title="Visit All about cookies (External link)">'+cookieWhatAreLinkText+'</a></div>');
                        } else {
                        	$('body').prepend('<div class="cc-cookies ' + cookieOverlay + '">' + cookieAnalyticsMessage + cookieAccept + cookieDecline + '<a href="' + cookieWhatAreTheyLink + '" title="Visit All about cookies (External link)">'+cookieWhatAreLinkText+'</a></div>');
                        }
                    } 
                    if (cookiePolicyPage) { // show policy page overlay
                   		 if(appOrPre) {
                       		 $('body').append('<div class="cc-cookies ' + cookieOverlay + '">' + cookiePolicyPageMessage + " " + ' <a href="#accept" class="cc-cookie-accept">'+cookieAcceptButtonText+'</a> ' + ' <a href="#decline" class="cc-cookie-decline">'+cookieDeclineButtonText+'</a> ' + '</div>');
                        } else {
                        	 $('body').prepend('<div class="cc-cookies ' + cookieOverlay + '">' + cookiePolicyPageMessage + " " + ' <a href="#accept" class="cc-cookie-accept">'+cookieAcceptButtonText+'</a> ' + ' <a href="#decline" class="cc-cookie-decline">'+cookieDeclineButtonText+'</a> ' + '</div>');
                        }
                    } else if ((!cookieAnalytics) && (!cookieDiscreetLink) ) { // show privacy policy option
                        if(appOrPre) {
                        	$('body').append('<div class="cc-cookies ' + cookieOverlay + '">' + cookieMessage + cookieAccept + cookieDecline + '</div>');
                        } else {
                        	$('body').prepend('<div class="cc-cookies ' + cookieOverlay + '">' + cookieMessage + cookieAccept + cookieDecline + '</div>');
                        }
                    }
                    
                }
                
                if ( (cookieCutter) && (!cookieCutterDeclineOnly) && ( ($cookieDeclined) || (!$cookieAccepted) ) ) {
                    $(cookieDisable).html('<div class="cc-cookies-error">' + cookieErrorMessage + ' <a href="#accept" class="cc-cookie-accept">'+cookieAcceptButtonText+'</a> ' + '</div>');
                }
                
                if ( (cookieCutter) && (cookieCutterDeclineOnly) && ($cookieDeclined) ) {
                    $(cookieDisable).html('<div class="cc-cookies-error">' + cookieErrorMessage + ' <a href="#accept" class="cc-cookie-accept">'+cookieAcceptButtonText+'</a> ' + '</div>');
                }
                
                // if bottom is true, switch div to bottom if not in discreet mode
                if( (cookieNotificationLocationBottom) && (!cookieDiscreetLink) ) {
                	$('div.cc-cookies').css("top", "auto");
                	$('div.cc-cookies').css("bottom", "0");
                }
                if( (cookieNotificationLocationBottom) && (cookieDiscreetLink) && (cookiePolicyPage) ) {
                	$('div.cc-cookies').css("top", "auto");
                	$('div.cc-cookies').css("bottom", "0");
                }
                
        
                // setting the cookies
        
        // for top bar
        $("body").on("click",'.cc-cookie-accept, .cc-cookie-decline', function(e) {
            e.preventDefault();
            if ($(this).is('[href$=#decline]')) {
            	$.cookieCuttr.SetCookie("cc_cookie_accept", null, "/");
                $.cookieCuttr.SetCookie("cc_cookie_decline", "cc_cookie_decline", "/");
			// clear down known google analytics cookies		
			if(cookieDomain) {
			$.cookieCuttr.SetCookie("__utma", null, "/");
			$.cookieCuttr.SetCookie("__utmb", null, "/");
			$.cookieCuttr.SetCookie("__utmc", null, "/");
			$.cookieCuttr.SetCookie("__utmz", null, "/");
			}
            } else {
            	$.cookieCuttr.SetCookie("cc_cookie_decline", null, "/");
                $.cookieCuttr.SetCookie("cc_cookie_accept", "cc_cookie_accept", "/");
            }
            $(".cc-cookies").fadeOut(function () {
                // reload page to activate cookies
                location.reload();
            });

        });
        
        //reset cookies
        $('a.cc-cookie-reset').click(function(f) {
        	f.preventDefault();
                $.cookieCuttr.SetCookie("cc_cookie_accept", null, "/");
                $.cookieCuttr.SetCookie("cc_cookie_decline", null, "/");
        	$(".cc-cookies").fadeOut(function () {
        	    // reload page to activate cookies
        	    location.reload();
        	});
        });
        
        //cookie error accept
        $('.cc-cookies-error a.cc-cookie-accept').click(function(g) {
        	g.preventDefault();
        	$.cookieCuttr.SetCookie("cc_cookie_decline", null, "/");
        	$.cookieCuttr.SetCookie("cc_cookie_accept", "cc_cookie_accept", "/");
        	    // reload page to activate cookies
        	    location.reload();
        });

    };

    $.cookieCuttr.SetCookie = function(name, value, path) 
                        {
				var expires = '';
				if(value != null)
				{
		 			ccToday = new Date();
				        ccExpire = new Date();
		                        ccExpire.setTime(ccToday.getTime() + 3600000*24*365);

	                            	expires = ';expires='+ccExpire.toGMTString();
				}
				else
                            {				
                                expires = ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
                                value = '';
                            }
                         
                         if(cookieDomain) {
                       	   document.cookie = name + '=' +escape(value) + ';path='+path + ';domain=.'+cookieDomain + expires;
                         } else {
	              		    document.cookie = name + '=' +escape(value) + ';path='+path + expires;
						}
                        };
    $.cookieCuttr.GetCookie = function(name) 
                        {
                            if(name.length > 0)
                            {
                                var cookies = ' ' + document.cookie;
                                var start = cookies.indexOf(' ' + name + '=');

                                if(start == -1)
                                {
                                    start = cookies.indexOf(';' + name + '=');

                                    if(start == -1)
                                    {
                                        return '';
                                    }            
                                }

                                var end = cookies.indexOf(';', start + 1);

                                if(end == -1)
                                {
                                    end = cookies.length;
                                }

                                return unescape(cookies.substring(start + name.length + 2, end));
                            }
                        };

// temporarily set variables for first load
$.cookieCuttr.accepted = $.cookieCuttr.GetCookie('cc_cookie_accept') == "cc_cookie_accept";
$.cookieCuttr.declined = $.cookieCuttr.GetCookie('cc_cookie_decline') == "cc_cookie_decline";

// launch plugin on doc ready
$(document).ready(function(){
	$.cookieCuttr();
});

})(jQuery);
