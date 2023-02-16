import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import axios from "axios";
import "./Home.scss";

export default function Home({ user, setUser }) {

    const navigate = useNavigate();
    // state for contact list, hasMore and records
    const [contactList, setContactList] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [records, setrecords] = useState(20);

    // if user is not logged in, redirect to login page
    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate]);


    // fetch contacts
    useEffect(() => {
        const getContacts = async () => {
            axios.get("https://randomuser.me/api/?results=500")
                .then((response) => {
                    setContactList(response.data.results);
                })
                .catch((error) => {
                    alert("Error fetching contacts");
                    console.log(error);
                });
        };
        getContacts();
    }, []);

    // handle logout
    const handleLogout = () => {
        setUser(null);
        navigate("/");
    };

    // handle load more
    const loadMore = () => {
        if (records === contactList.length) {
          setHasMore(false);
        } else {
          setTimeout(() => {
            setrecords(records + 20);
          }, 1000);
        }
    };
    
    return (
        <>
        { user && contactList &&
            <div className="home">
            
                {/* logout button */}
                <div className="logout">
                    <button className="logoutButton" onClick={handleLogout}>Logout</button>
                </div>

                {/* heading */}
                <h1 className="homeTitle">Hello {user.username}!</h1>

                {/* contact list */}
                <InfiniteScroll
                    pageStart={0}
                    loadMore={loadMore}
                    hasMore={hasMore}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                    useWindow={true}
                >
                    <div className="contactList">
                        {contactList.slice(0, records).map((contact, index) => (
                            <div className="contact" key={index}>
                                <img src={contact.picture.medium} alt="" className="contactImage" />
                                <h2 className="contactName">{contact.name.title} {contact.name.first} {contact.name.last}</h2>
                            </div>
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
        }
        </>
    );
}