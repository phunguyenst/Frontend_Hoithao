import styled from "styled-components";

const Div = styled.div`
  width: 100%;
  margin-bottom: 10px;
  overflow-x: scroll;
`;

const Td = styled.td`
  background-color: rgba(0, 130, 0, ${props => props.opacity});
  border: 0.5px solid white;
  width: fit-content;
  height: 10px;
  text-align: center;
`;

const Th = styled.th`
  text-align: center;
  font-size: 10px;
  width: 70px;
  height: 20px;
  border-right: 10px solid white;
`;
function getDates (startDate, endDate) {
  const dates = [""]
  let currentDate = startDate
  const addDays = function (days) {
    const date = new Date(this.valueOf())
    date.setDate(date.getDate() + days)
    return date
  }
  currentDate = addDays.call(currentDate, 0)
  endDate = addDays.call(endDate, 0)
  while (currentDate <= endDate) {
    var dateString =
    ("0" + currentDate.getUTCDate()).slice(-2) + "/" +
    ("0" + (currentDate.getUTCMonth()+1)).slice(-2);
    dates.push(dateString)
    currentDate = addDays.call(currentDate, 1)
  }
  return dates
}

const getTimes = (fromTime, numOfTime) => {
  var stringMinutes;
  var Times = []
  var hour = fromTime[0];
  var minutes = fromTime[1];
  for (var j = 0; j < numOfTime; j++) {
    stringMinutes = (minutes === 30) ? "30" : "00";
    Times.push(hour + ":" + stringMinutes)
    if(stringMinutes === "30") {
      hour = hour + 1;
      minutes = 0;
    }
    else {
      minutes = 30;
    }
  }
  return Times;
}

const SchedTable = (props) => {
  var d_from = new Date(props.fromDate)
  var d_to = new Date(props.toDate)
  var diffTime = d_to.getTime() - d_from.getTime();
  var numOfDate = diffTime / (1000 * 3600 * 24)+1;
  var dates = getDates(props.fromDate, props.toDate)

  var hour_from = new Date("01/01/2007 " + props.fromTime).getHours();
  var hour_to = new Date("01/01/2007 " + props.toTime).getHours();
  var minute_to = new Date("01/01/2007 " + props.toTime).getMinutes();
  var numOfTime = (hour_to - hour_from)*2;  
  if(minute_to >= 30) numOfTime++; 

  var fromTimeArr = (props.fromTime.split(':')).map((x) => { return parseInt(x) });
  if(fromTimeArr[1] < 30) {
    fromTimeArr[1] = 0;
  }
  else fromTimeArr[1] = 30;
  var times = getTimes(fromTimeArr, numOfTime)

  var keyBox = []
  for(let iDay = 0; iDay < props.data.length; iDay++) {
    var i = 0;
    var boxs = []
    var keys = Object.keys(props.data[iDay])
    var vals = Object.values(props.data[iDay])
    var arrkey = keys[i].split(' - ')
    var nMem = vals[i].length

    for(let j = 0; j < times.length; j++) {
      if(times[j] < arrkey[1]) boxs.push([times[j], nMem/props.totalMem]);
      else {
        i = i+1;
        j = j-1;
        arrkey = keys[i].split(' - ')
        nMem = vals[i].length
      }
    }
    keyBox.push(boxs)
  }
  var rows = [];
  var tb = [];

  const header = dates.map((date) => 
    <Th key={date}>
      {date}
    </Th>
  );
  for(let i = 0; i < numOfTime; i++) {
    var row = [];
    for(let j = 0; j < numOfDate; j++) {
      if(j === 0) {
        row.push(<td key={"time " + i}>{times[i]}</td>)
      }
      row.push(<Td key={i+'-'+j} opacity={1-keyBox[j][i][1]}></Td>)
    }
    rows.push(<tr key={"row " + i}>{row}</tr>)
  }

  tb.push(<tr key="header">{header}</tr>)
  tb.push(rows)

  return (
    <>
      <Div>
        <table>
          <tbody>
            {tb}
          </tbody>
        </table>
      </Div>
    </>
  )
}



export default SchedTable