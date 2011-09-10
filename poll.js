/***
 * Provides a polling utility with Y.io module callbacks
 *  
 * @module poll
 *
 ***/
YUI.add('poll', function(Y){
    
    Y.Poll = Y.Base.create('poll', Y.Base, [], {
        /**
         * Private parameter for timeout
         **/
        _timer : null,
        /**
         * Private parameter for io object
         **/
        _io : null,
        /**
         * Intialization function, publishes success event
         **/
        initializer : function() {
          this.publish('success');  
        },
        /**
         * Start polling given a url and timeout
         *  @method start
         *  @param url {String} to poll
         *  @param timeout {Int} time in milliseconds to poll.
         **/
        start : function(url, timeout) {
            if(url) {
                this.set('url', url);
            }
            
            if(timeout) {
                this.set('timeout', timeout);
            }
            
            this._poll();
        },
        /**
         * Stop polling
         *  @method stop
         **/        
        stop : function() {
            if(this._timer) {
                this._timer.cancel();
                this._timer = null;
            }
            
            if(this._io) {
                this._io.abort();
                this._io = null;
            }
        },
        /**
         * Start the timer for polling in a time interval
         *  @method _startPoll
         **/        
        _startPoll : function(){
            this._timer = Y.later(this.get('timeout'), this, this._poll);
        },
        /**
         * Pull requested url with given event config
         *  @method _startPoll
         **/          
        _poll : function(){
            this._io = Y.io(this.get('url'), {
                on: this.get('on'),
                xdr: {
                    use: 'native',
                    credentials: false
                }
            });
            
            this._startPoll();
        }
    }, {
        ATTRS : {
            url : {},
            timeout : {
                value : 5000
            },
            on: {}
        }
    });
    
    
}, '0.1', {requires: ['io','node','event','base-build']});
