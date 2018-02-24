import {getClasses} from '../api/post';


export const GET_EXAM_ROOM = 'GET_EXAM_LIST'
export const GET_DATA = 'GET_DATA'
export const loadExamRoom = (examId, orderId) => {
    return {
        type: GET_EXAM_ROOM,
        data: 111
        /*payload: getExamRoomData({
            exam_id: examId,
            order_id: orderId
        })*/
    }
}

export const getData = () =>{
    return {
        type: GET_DATA,
        payload: getClasses({})
    }
}