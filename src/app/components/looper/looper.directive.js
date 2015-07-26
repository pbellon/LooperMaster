/* globals bpm, console */
class LooperDirective {
    constructor(){
        'ngInject';

        let directive = {
            restrict: 'E',
            templateUrl: 'app/components/looper/looper.html',
            controller: LooperController,
            controllerAs: 'looper',
            bindToController: true
        };
        return directive;
    }
}

class LooperController {
    constructor($scope){
        'ngInject';

        this.signature = {
            top: 4,
            bottom: 4
        };
        this.position = {tick: 0, bar: 0};
        this.playing = false;
        this.bpm = 120;
        this.bpmInstance = bpm.init({
            bpm: this.bpm,
            signature: this.getSignature(),
            onTick: (position)=> this.onTick(position)
        });

        this.$scope = $scope;

        this.$scope.$watch('looper.bpm', (newVal, oldVal)=> {
            if(newVal && oldVal && (newVal !== oldVal)){
                this.onBPMChanged();
            }
        }, true);
        this.$scope.$watch('looper.signature', (newVal, oldVal)=> {
            if(newVal && oldVal && (newVal !== oldVal)){
                this.onSignatureChanged();
            }
        }, true);

    }

    listTicks(){
        let ticks = [];
        for (var i = 0; i < this.signature.top; i++) {
            ticks.push(i);
        }
        return ticks;
    }

    isTickActive(tickNumber){
        let currentTick = this.position.tick;
        return tickNumber < currentTick+1 && this.isPlaying();
    }

    getSignature(){
        return [this.signature.top, this.signature.bottom];
    }

    togglePlay(){
        if(!this.isPlaying()){
            this.play();
        } else {
            this.pause();
        }
    }

    onTick(position){
        this.$scope.$apply(()=>{
            this.position = position || {tick: 0, bar: 0};
        });
    }

    isPlaying(){
        return this.playing;
    }

    play(){
        this.playing = true;
        this.bpmInstance.play();
    }

    pause(){
        this.playing = false;
        this.bpmInstance.pause();
    }

    stop(){
        this.playing = false;
        this.position = {tick: 0, bar: 0};
        this.bpmInstance.stop();
    }

    onBPMChanged(){
        this.bpmInstance.setBPM(this.bpm);
    }

    onSignatureChanged(){
        this.bpmInstance.setSignature(this.getSignature());
    }
}

export default LooperDirective;
