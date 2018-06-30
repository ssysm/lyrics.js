/**
 * Parse LRC
 */
class LrcParser {
    constructor(props){
        this.result             = {};
        this.result.info        = [];
        this.result.content     = [];
        this.file               = props.file;
        this.renderArray        = [];

        this.audioElm           = props.audioElm;
        this.displayElm         = props.displayElm;
        
        this.jump2audio         = this.jump2audio       .bind(this);
        this.sync               = this.sync             .bind(this);
        this.appendToDisplay    = this.appendToDisplay  .bind(this);

        this.audioElm.addEventListener('timeupdate',this.sync,false);

        this.parse();
    }
    //Parse LRC to JSON
    parse(){
        const lrcArr = this.file.trim().split('\n');
        //loop over the file
        for(let line of lrcArr){
            this.object = new Object();
            //set timestamp regex
            var regex = /\[([^\]|\d]*)+:+([^\]]*)+\]|\[((\d+):(\d+\.\d+))\]+([^\n]*)/gm;
            var match = regex.exec(line);
            if(match[1]&&match[2]){
                this.result.info.push(this.extractInfo(match))
            }
            else if(match[3]&&match[4]&&match[5]){
                this.result.content.push(this.extractContent(match))
            }
        }
        this.render();
        return this.result;
    }
    //Extract header info
    extractInfo(regex){
        this.object = {
            tag:regex[1],
            content:regex[2]
        }
        return this.object;
    }
    //Extract lrc content
    extractContent(regex){
        var playerTimecode = parseInt(regex[4]) * 60 + parseFloat(regex[5]);
        this.object = {
            timecode:regex[3],
            playerTimecode,
            content:regex[6]
        };
        return this.object;
    }

    render(){
        this.result.content.map(d => {
            var node = document.createElement("SPAN");
            var textnode = document.createTextNode(d.content);
            var brnode = document.createElement("BR");
    
            node.addEventListener('click', this.jump2audio, false);
            node.classList.add('lrcElm');
            node.setAttribute('data-timecode', d.playerTimecode);
    
            node.appendChild(textnode);
            node.appendChild(brnode);
    
            this.renderArray.push(node);
        });
        this.appendToDisplay();
        return this.renderArray;
    }

    sync(event){
        let currentTime = event.target.currentTime; //current player time

        this.result.content.map((data, index) => {
            var currentElmTimecode = parseInt(data.playerTimecode);

            if (this.result.content[index + 1]) {
                var nextElmTimecode = parseInt(this.result.content[index + 1].playerTimecode);
            } else {
                var nextElmTimecode = 0;
            }

            if (currentTime >= currentElmTimecode && currentTime <= nextElmTimecode) {
                console.log(
                    `currentTime: ${currentTime}, elemTime: ${currentElmTimecode}, nextElmTime: ${nextElmTimecode}`
                )
                console.log(elem.children[index])
                this.displayElm.children[index].classList.add('active');
            } else  {
                this.displayElm.children[index].classList.remove('active');
            }
        });
    }

    jump2audio(event){
        var timecode = parseInt(event.target.getAttribute('data-timecode'));
        this.audioElm.currentTime = timecode;
    }

    appendToDisplay(){
        this.renderArray.map(node=>{
            this.displayElm.appendChild(node);
        });
    }
}

// module.exports = LrcParser;