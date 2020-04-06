import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';

export default {
    notification: (message) => {
        return toast(message, {
            className: css({
                background: '#3C91E6',
                boxShadow: '0px 13px 12px -12px rgba(47,51,56,0.64)',
                borderRadius: '8px',
                border: "3px solid #F9FCFF",
                textTransform: "capitalize"
            }),
            bodyClassName: css({
                fontSize: '20px',
                color: '#F9FCFF'
            }),
            progressClassName: css({
                background: "linear-gradient(90deg, rgb(86,149,211) 0%, rgb(249,252,255) 80%)"
            })
        });
    }
}