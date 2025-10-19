'use client';
type NewButtonProps = {
    className?: string; 
}

export default function NewButton ({className}: NewButtonProps) {
    return (

        <button className= {className} onClick={() => console.log("this ssss is a buffolo")}>cccc Click to aaaa console log</button>
    );
}
