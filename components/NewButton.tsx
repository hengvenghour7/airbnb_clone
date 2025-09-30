'use client';
type NewButtonProps = {
    className?: string; 
}

export default function NewButton ({className}: NewButtonProps) {
    return (

        <button className= {className} onClick={() => console.log("this is a buffolo")}>Click to console log</button>
    );
}
