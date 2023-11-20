import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from 'axios';

const BlackList = () => {
    const [users, setUsers] = useState([]);
    const [selectId, setSelectId] = useState(1);

    useEffect(() => {
        const is_admin = sessionStorage.getItem("is_admin");
        if (is_admin !== "true") {
            window.location.href = "/";
        }

        const access_token = sessionStorage.getItem("access_token");

        const headers = {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
        };
        axios
        .get("/api/user/all-user", { headers })
        .then((response) => {
            setUsers(response.data);
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

    },[])

    const registerBlackList = () => {
        const is_admin = sessionStorage.getItem("is_admin");
        if(is_admin === "true") {
            const access_token = sessionStorage.getItem("access_token");

            const headers = {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
            };
            axios
            .post(`/api/user/register/blacklist?user_id=${selectId}`, {}, { headers })
            .then((response) => {                
                deletePosts();
            })
            .catch((error) => {
                console.log(error);
            });
        }   
    }

    const deletePosts = () => {
        const access_token = sessionStorage.getItem("access_token");

        const headers = {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
        };
        axios
        .post(`/api/product/remove?user_id=${selectId}`, {}, { headers })
        .then((response) => {
            console.log(response.data);
            alert(`해당 유저를 블랙리스트로 등록하였으며, 모든 게시물을 삭제하였습니다.`);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const removeBlackList = () => {
        const is_admin = sessionStorage.getItem("is_admin");
        if(is_admin === "true") {
            const access_token = sessionStorage.getItem("access_token");

            const headers = {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
            };
            axios
            .post(`/api/user/remove/blacklist?user_id=${selectId}`, {}, { headers })
            .then((response) => {
                console.log(response.data);
                alert("해당 유저의 블랙리스트를 해제시켰습니다.")
                
            })
            .catch((error) => {
                console.log(error);
            });
        }  
    }


    return (
        <div>
            <Header />


            <div className="w-screen h-screen flex flex-col justify-center items-center gap-10">
                <h className="text-3xl">블랙리스트 등록/해제</h>
                <div className="flex gap-2">
                    <div>유저 목록</div>
                    <select onChange={(e) => setSelectId(e.target.value)}>
                        {users?.map((content) =>(
                            <option value={content.user_id}>유저 이름 : {content.username}, 유저 닉네임 : {content.nickname}</option>
                        ))}
                    </select>
                    <button onClick={registerBlackList} className="border p-2 bg-red-400 text-white">블랙리스트 등록</button>
                    <button onClick={removeBlackList} className="border p-2 bg-blue-400 text-white">블랙리스트 해제</button>
                </div>
            </div>
        </div>
    )
}

export default BlackList;