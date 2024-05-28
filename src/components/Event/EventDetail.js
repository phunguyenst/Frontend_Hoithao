import styled from "styled-components";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";

const Detail = styled.div`
	width: 50%;
	box-sizing: border-box;
	border-right: 0.5px solid #1c2a3a;
	padding-right: 20px;
	max-height: 100%;
	padding-left: 5px;
	padding-bottom: 5px;
	overflow-y: scroll;
	overflow-x: hidden;
	/* width */
    &::-webkit-scrollbar {
        width: 5px;
    }
    /* Track */
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: gray;
        border-radius: 3px;
    }
`;
const Span = styled.div`
	color: #1c2a3a;
	font-size: 14px;
	font-weight: 700;
	padding-bottom: 10px;
`
const TimeInterval = styled.div`
	margin: 1rem 0;
	display: flex;
	justify-content: space-between;
	width: 100%;
	box-sizing: border-box;
`
const Label = styled(Form.Label)`
	font-weight: 600;
`;
const Radio = styled(Form.Check)`
	margin-left: 10px;
	font-size: 14px;
  color: black;
`;
function daysToSrting(day) {
  const daysOfWeek = ['Chủ nhật', 'Thứ hai','Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
  return daysOfWeek[day.getDay()]
}

function EventDetail(props) {
  const [freqType, setFreqType] = useState(0)
  function onChangeValue(event) {
    setFreqType(event.target.value)
    props.setFreq(event.target.value)
  }
  useEffect(() => {
    setFreqType(`${props.freqSetting.option}`)
  }, [props.freqSetting])
	return (
		<Detail>
			<Span>CHI TIẾT SỰ KIỆN</Span>
			<Form>
				<Form.Group>
					<Label>Ngày tổ chức</Label>
					<Form.Control type="date" 
            style={{backgroundColor: 'white'}} 
            readOnly={!props.isEdit}
            required
            onChange={e => props.setStartDay(e.target.value)}
            value={props.startDay}/>
					<Form.Text className="text-muted">
						Tham khảo chức năng xếp lịch để lựa chọn thời gian phù hợp.
					</Form.Text>
				</Form.Group>
				<TimeInterval>
					<Form.Group style={{ width: '48%' }}>
						<Label>Thời gian bắt đầu</Label>
						<Form.Control 
              type="time" style={{backgroundColor: 'white'}} 
              readOnly={!props.isEdit}
              required
              value={props.startTime}
              onChange={e => props.setStartTime(e.target.value)}/>
					</Form.Group>
					<Form.Group style={{ width: '48%' }}>
						<Label>Thời gian kết thúc</Label>
						<Form.Control type="time" 
              style={{backgroundColor: 'white'}} 
              readOnly={!props.isEdit}
              required
              value={props.endTime}
              onChange={e => props.setEndTime(e.target.value)}/>
					</Form.Group>
				</TimeInterval>
				<Form.Group>
					<Label>Địa điểm</Label>
					<Form.Control type="text" value={props.location} 
            style={{backgroundColor: 'white'}} 
            readOnly={!props.isEdit}
            onChange={e => props.setLocation(e.target.value)}/>
					<Form.Text className="text-muted">
						Địa điểm có thể là địa chỉ, link Google Map hoặc link Meet online.
					</Form.Text>
				</Form.Group>
				<Form.Group style={{ marginTop: '1rem' }}>
					<Label>Chu kỳ diễn ra</Label>
					{['radio'].map((type) => (
						<div key={`default-${type}`} className="mb-3">
							<Radio
                disabled={!props.isEdit}
								type={type}
								id={`default-${type}`}
								label={`Không`}
								name={`freq`}
                value='0'
                checked={freqType === '0'}
                onChange={onChangeValue}
							/>
							<Radio
                disabled={!props.isEdit}
								type={type}
								label={`Hằng ngày`}
								id={`default-${type}`}
								name={`freq`}
                value='1'
                checked={freqType === '1'}
                onChange={onChangeValue}
							/>
							<Radio
                disabled={!props.isEdit}
								type={type}
								label={`Hằng tuần vào ${daysToSrting(new Date(props.startDay))}`}
								id={`default-${type}`}
								name={`freq`}
                value='2'
                checked={freqType === '2'}
                onChange={onChangeValue}
							/>
							<Radio
                disabled={!props.isEdit}
								type={type}
								label={`Hằng tháng vào ngày ${props.startDay.slice(8,10)}`}
								id={`default-${type}`}
								name={`freq`}
                value='3'
                checked={freqType === '3'}
                onChange={onChangeValue}
							/>
							<Radio
                disabled={!props.isEdit}
								type={type}
								label={`Hằng năm vào ngày ${props.startDay.slice(5)}`}
								id={`default-${type}`}
								name={`freq`}
                value='4'
                checked={freqType === '4'}
                onChange={onChangeValue}
							/>
							{/* <Radio
                disabled={!props.isEdit}
								type={type}
								label={`Tuỳ chỉnh`}
								id={`default-${type}`}
								name={`freq`}
							/> */}
						</div>
					))}
				</Form.Group>
				<Form.Group>
					<Label>Mô tả sự kiện</Label>
					<Form.Control as="textarea" rows={5} 
            style={{backgroundColor: 'white'}} 
            readOnly={!props.isEdit}
            value={props.description}
            onChange={e => props.setDescription(e.target.value)}/>
				</Form.Group>
			</Form>
		</Detail>
	)
}

export default EventDetail;