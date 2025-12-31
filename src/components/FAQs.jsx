import React, { useState } from 'react';

const FAQs = () => {
    const [openFAQ, setOpenFAQ] = useState(null);

    const faqs = [
        {
            id: 2,
            question: "Do I need to create an account to use this service?",
            answer: "No account required! You can create and download your biodata instantly without any signup process. Your privacy is important to us."
        },
        {
            id: 3,
            question: "Can I edit my biodata after creating it?",
            answer: "Yes, you can edit your biodata anytime during your session. Your data is temporarily saved in your browser, so you can make changes before downloading the final version."
        },
        {
            id: 4,
            question: "What formats can I download my biodata in?",
            answer: "You can download your biodata as a high-quality PDF file, which is perfect for printing and sharing. The PDF maintains all formatting and looks professional."
        },
        {
            id: 5,
            question: "How do I add my photo to the biodata?",
            answer: "Simply click on the photo upload area in the form, select your image file, and crop it to fit perfectly. We support JPG, PNG, and other common image formats."
        },
        {
            id: 6,
            question: "Are there different templates available?",
            answer: "Yes! We offer multiple beautiful templates including Traditional, Modern, Floral, Royal, Simple, and Artistic designs. Each template has its unique style and color scheme."
        },
        {
            id: 7,
            question: "Is my personal information secure?",
            answer: "Absolutely! Your data is only stored temporarily in your browser and is never sent to our servers. Once you close your browser, all information is automatically deleted."
        },
        {
            id: 8,
            question: "Can I print the biodata directly?",
            answer: "Yes, you can either download the PDF and print it, or use your browser's print function directly from the preview page. The biodata is optimized for standard A4 paper size."
        },
        {
            id: 9,
            question: "What if I make a mistake in my biodata?",
            answer: "No worries! You can easily go back to the form, make corrections, and generate a new version. The preview updates in real-time as you make changes."
        },
        {
            id: 10,
            question: "Can I use this on my mobile phone?",
            answer: "Yes, our biodata maker is fully responsive and works perfectly on mobile phones, tablets, and desktop computers. You can create your biodata from any device."
        }
    ];

    const toggleFAQ = (id) => {
        setOpenFAQ(openFAQ === id ? null : id);
    };

    return (
        <section id="faqs" className="faqs-section">
            <div className="faqs-container">
                <div className="faqs-header">
                    <h2>Frequently Asked Questions</h2>
                    <p>Everything you need to know about creating your perfect marriage biodata</p>
                </div>

                <div className="faqs-list">
                    {faqs.map((faq) => (
                        <div
                            key={faq.id}
                            className={`faq-item ${openFAQ === faq.id ? 'active' : ''}`}
                        >
                            <button
                                className="faq-question"
                                onClick={() => toggleFAQ(faq.id)}
                                aria-expanded={openFAQ === faq.id}
                            >
                                <span>{faq.question}</span>
                                <span className="faq-icon">
                                    {openFAQ === faq.id ? '−' : '+'}
                                </span>
                            </button>

                            <div className={`faq-answer ${openFAQ === faq.id ? 'open' : ''}`}>
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQs;