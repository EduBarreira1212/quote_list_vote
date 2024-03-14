import { useEffect, useState } from "react";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import Quote from "../atoms/Quote";
import VoteButtons from "../atoms/VoteButtons";
import axios from 'axios';


const QuoteInput = () => {
    const [author, setAuthor] = useState();
    const [text, setText] = useState();
    const [note, setNote] = useState();
    const [quote, setQuote] = useState({author: "", text: "", note: 0});
    const [quoteList, setQuoteList] = useState([]);

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://type.fit/api/quotes");
                setQuoteList(response.data);
            } catch (error) {
                console.log("Error fetching data", error);
            }
        };
        fetchData();
    }, []);


    const handleAuthorChange = (event) => {
        setAuthor(event.target.value);
    }

    const handleTextChange = (event) => {
        setText(event.target.value);
    }

    const handleVoteClick = (event) => {
        setNote(event.target.value);
    }

    const handleClick = () => {
        setQuote({author: author, text: text, note: note});
        setQuoteList((prev) => [...prev, quote]);
    }

    return (
        <>
            <section className="quote-input-section hidden">
                <Input className="input-author" onChange={handleAuthorChange} placeholder="Author"/>
                <Input className="input-text" onChange={handleTextChange} placeholder="Text"/>
                <VoteButtons onClick={handleVoteClick}/>
                <Button classname="btn" onClick={handleClick}>Send</Button>
                {quoteList.sort((a, b) => b.note - a.note).map((item, index) => (
                <Quote key={index}>{item}</Quote>
                ))}
            </section>
        </>
    );
}

export default QuoteInput;