/*
*
*   parse .lrc files into json
*   
*   @params:
*           file: .lrc string
*
*/
//just quick testing
class LrcParser {
    constructor(props){
        this.result = new Object();
        this.result.info = new Array();
        this.result.content = new Array();
        this.file = props.file;
    }

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
        console.log(this.result);
    }

    extractInfo(regex){
        this.object = {
            tag:regex[1],
            content:regex[2]
        }
        return this.object;
    }

    extractContent(regex){
        var playerTimecode = parseInt(regex[4]) * 60 + parseFloat(regex[5]);
        this.object = {
            timecode:regex[3],
            playerTimecode,
            content:regex[6]
        }
        return this.object;
    }
}

module.exports = LrcParser;