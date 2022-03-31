import React, { useContext } from 'react'
import style from './ServerSec.module.css';
import accord from '../../../assets/Loader.gif'
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlus, AiFillSetting } from 'react-icons/ai';
import UserContext from '../../../Contexts/user-context';
const imgPath = "http://192.168.100.130:3000/images/servers/";

export default function ServerSec() {
    const nav = useNavigate();
    const { user, servers, setIsAuthor, setCurrServer, setIsServerSelected } = useContext(UserContext);
    function onServerClickHandler(data) {
        (data.author.email === user.email) ?
            setIsAuthor(true) : setIsAuthor(false);
        setCurrServer(data);
        setIsServerSelected(true);
    }
    const onClickCreateServer = () => nav('/user/Create-Server');
    let serversObj = Object.keys(servers).map((item) => (
        <div key={item} onClick={() => onServerClickHandler(servers[item])}>
            <img
                src={`${imgPath}${servers[item].image}`}
                alt={`${item}`}
            />
        </div>
    ));

    return (
        <>
            <section className={style.servers_section}>
                <div className={style.upper}>
                    <div onClick={() => setIsServerSelected(false)}>
                        <img src={accord} alt="Accord" />
                    </div>
                    {serversObj}
                    <div onClick={onClickCreateServer}>
                        <AiOutlinePlus color='rgb(0,150,0)' className={style.react_icon} />
                    </div>
                </div>
                <div className={style.lower}>
                    <div onClick={() => nav('/user/settings')}>
                        <AiFillSetting color='rgb(20,20,20)' className={style.react_icon} />
                    </div>
                </div>
            </section>
        </>
    )
}