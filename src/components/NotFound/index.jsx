import { useNavigate } from "react-router-dom";
import { Button, Result } from 'antd';
import useSelection from "antd/es/table/hooks/useSelection";
import { useSelector } from "react-redux";

const NotFound = () => {

    const user = useSelector(state => state.account.user);
  

    const navigate = useNavigate();
    return (
        <>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary"
                    onClick={() => {
                        user.role === 'USER' ? navigate('/') : navigate('/admin')
                    }}
                >Back Home</Button>}
            />
        </>
    )
}

export default NotFound;