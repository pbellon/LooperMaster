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
        this.bpm = 120;
        this.$scope = $scope;
        this.$scope.$watch('looper.bpm', this.onBPMChanged);
        this.$scope.$watch('looper.signature', this.onSignatureChanged);
    }

    play(){
        this.bpmInstance.play();
    }

    pause(){
        this.bpmInstance.pause();
    }

    onBPMChanged(){
        this.bpmInstance.setBPM(this.bpm);
    }
    onSignatureChanged(){
        let signature = this.signature;
        this.bpmInstance.setSignature([signature.top, signature.bottom]);
    }
}

export default LooperDirective;
