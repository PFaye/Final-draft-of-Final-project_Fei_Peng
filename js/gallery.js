"use strict";
        var photoDivs = document.getElementsByClassName("gallery-image");
        var nextButton = document.getElementById("button_next");
        var previousButton = document.getElementById("button_previous");
        var photoNumber = document.getElementById("stepper");
        var currentPhotoNumber = 0;

        var shareConfig = {
            caption: 'Exploring Washington DC Landmarks!',
            hashtags: 'WashingtonDC,Travel,Landmarks',
            getShareUrl: function(imageUrl) {
                return `https://x.com/intent/tweet?text=${encodeURIComponent(this.caption)}&hashtags=${encodeURIComponent(this.hashtags)}&url=${encodeURIComponent(window.location.href)}`;
            }
        };

        photoDivs[currentPhotoNumber].classList.remove('hideThis');
        updatePhotoNumber();

        function updatePhotoNumber() {
            photoNumber.innerHTML = (currentPhotoNumber + 1) + " / " + photoDivs.length;
        }

        nextButton.addEventListener('click', function() {
            photoDivs[currentPhotoNumber].classList.add("hideThis");
            currentPhotoNumber = currentPhotoNumber + 1;
            if (currentPhotoNumber === photoDivs.length) {
                currentPhotoNumber = 0;
            }
            photoDivs[currentPhotoNumber].classList.remove('hideThis');
            updatePhotoNumber();
            updateShareButton();
        });

        previousButton.addEventListener('click', function() {
            photoDivs[currentPhotoNumber].classList.add("hideThis");
            currentPhotoNumber = currentPhotoNumber - 1;
            if (currentPhotoNumber < 0) {
                currentPhotoNumber = photoDivs.length - 1;
            }
            photoDivs[currentPhotoNumber].classList.remove('hideThis');
            updatePhotoNumber();
            updateShareButton();
        });

        var touchStartX = 0;
        var touchEndX = 0;

        document.addEventListener('touchstart', function(event) {
            touchStartX = event.touches[0].clientX;
        });

        document.addEventListener('touchend', function(event) {
            touchEndX = event.changedTouches[0].clientX;
            handleSwipe();
        });

        function handleSwipe() {
            var swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                nextButton.click();
            } else if (touchEndX > touchStartX + swipeThreshold) {
                previousButton.click();
            }
        }

        function updateShareButton() {
            var currentImage = photoDivs[currentPhotoNumber].querySelector('img');
            if (!currentImage) return;
            
            var imageUrl = currentImage.src;
            var shareUrl = shareConfig.getShareUrl(imageUrl);
            
            var xShare = document.getElementById('x-share');
            if (xShare) {
                xShare.href = shareUrl;
            }
        }

        updateShareButton();