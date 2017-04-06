(function() {
    function SongPlayer() {
        var SongPlayer = {};
        var currentSong = null;
        
/**
* @desc Buzz object audio file
* @type {Object}
*/
        var currentBuzzObject = null;

/**
* @function setSong
* @desc Stops currently playing song and loads new audio file as currentBuzzObject
* @param {Object} song
*/
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentSong = song;
         };
/**
* @function playSong
* @desc Plays current song.
* @param {Object} song
*/ 

        var playSong = function(song) {
            currentBuzzObject.play();  
            song.playing = true;
        };
  
/**
* @method play
* @desc plays a song if it is current song, switches to current song if not.
* @type method of SongPlayer
*/ 
        SongPlayer.play = function(song) {
            if (currentSong !== song){
                if (currentBuzzObject) {
                    currentBuzzObject.stop();
                    currentSong.playing = null;
                }
                
                currentBuzzObject = new buzz.sound(song.audioUrl, {
                    formats: ['mp3'],
                    preload: true
                 });

                currentSong = song;
                setSong(song);
                
                playSong();
    
            } else if (currentSong === song) {
                if(currentBuzzObject.isPaused()) {
                    currentBuzzObject.play();
                }
            }
        };
 
/**
* @method pause
* @desc pauses current song.
* @type method
*/ 
        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        };
    
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer)
})();