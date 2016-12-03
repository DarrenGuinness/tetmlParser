var fs = require('fs');
var fs2 = require('fs');
var outFile="converted.txt";

function searchString(target, tosearch)
{
    if(tosearch.indexOf(target) > -1)
    {
        return true;
    }
    return false;
}


function checkLine(line)
{
    if(searchString("</Annotations>", line))
    {
        pastMetaData=true;
    }
    if(searchString("<Text>", line) ) {
        cnt++;
        readNext = true;
        line=line.replace('<Text>', '');

    }
    if(searchString("</Text>", line)) {
        cnt--;
        readNext=false;
        line=line.replace('</Text>', '');
        line= line+"\n\n";
        fs2.appendFile(outFile, line);
    }
    if(readNext)
    {
        fs2.appendFile(outFile, line);
    }
}

var lineReader = require('readline').createInterface({
    input: fs.createReadStream('Aug_Cursors.tetml')
});

var cnt=0;
var readNext=false;
var pastMetaData=false;

lineReader.on('line', function (line) {
    //console.log('Line from file:', line);
    checkLine(line);
});