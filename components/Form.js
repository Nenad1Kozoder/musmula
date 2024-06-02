// "use client";
// import { useState } from "react";
// import sendEmail from "../utils/email";

// export default function Form() {
//   function handleSendEmail() {
//     // sendEmail(
//     //   "recipient@example.com",
//     //   "Test Email",
//     //   "<p>Hello, this is a test email!</p>"
//     // );
//   }

//   return (
//     // <form onSubmit={handleSendEmail}>
//     <form>
//       <label htmlFor="name">Ime</label>
//       <input type="text" id="name" name="name" />
//       <label htmlFor="lastname">Prezime</label>
//       <input type="text" id="lastname" name="lastname" />
//       <label htmlFor="email">E-mail</label>
//       <input type="email" id="email" name="email" />
//       <label htmlFor="phone">Telefon</label>
//       <input type="phone" id="phone" name="phone" />
//       <label htmlFor="date">Datum događaja</label>
//       <input type="date" id="date" name="date" />
//       <label htmlFor="place">Mesto događaja</label>
//       <input type="text" id="place" name="place" />
//       <label htmlFor="story">Vaša priča</label>
//       <textarea id="story" name="story" rows="4" cols="50" />
//       <button type="submit">POŠALJITE</button>
//     </form>
//   );
// }

// export default function Form({ handler, isLoading, isSent, hasError }) {
//   const [formState, setFormState] = useState({});

//   const handleFieldChange = (field, e) => {
//     setFormState({
//       ...formState,
//       [field]: e.target.value,
//     });
//   };

//   const handleFormSubmit = (e) => {
//     handler(e, formState);
//   };

//   return (
//     <form onSubmit={handleFormSubmit}>
//       <div>isLoading: {isLoading ? "Loading" : "false"}</div>
//       <div>isSent: {isSent ? "Sent" : "false"}</div>
//       <div>Error: {hasError || "null"}</div>

//       <div>Enter your name:</div>
//       <input onChange={(e) => handleFieldChange("your-name", e)} type="text" />
//       <div>Enter your email:</div>
//       <input onChange={(e) => handleFieldChange("your-email", e)} type="text" />
//       <div>Subject:</div>
//       <input
//         onChange={(e) => handleFieldChange("your-subject", e)}
//         type="text"
//       />
//       <div>Message:</div>
//       <textarea onChange={(e) => handleFieldChange("your-message", e)} />
//       <input type="submit" value="Send" />
//     </form>
//   );
// }
"use client";
// import style from "./Form.module.css";
import { useState } from "react";
// import { Textarea } from "@nextui-org/react";
// const siteUrl = "process.env.NEXT_PUBLIC_SITE_URL";

export default function Form() {
  const [formData, setFormdata] = useState({
    nom: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormdata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);

    try {
      const form = new FormData();
      form.append("nom", formData.nom);
      form.append("email", formData.email);
      form.append("subject", formData.subject);
      form.append("message", formData.message);
      const response = await fetch(
        "https://musmula.nenad-kozoder.rs/wp-json/contact-form-7/v1/contact-forms/049df36/feedback",
        {
          method: "POST",
          body: form,
        }
      );
      //   const response = await fetch(
      //     `https://musmula.nenad-kozoder.rs/wp-json/contact-form-7/v1/contact-forms/3b72e79/feedback`,
      //     {
      //       method: "POST",
      //       body: form,
      //     }
      //   );

      const responseBody = await response.json();
      console.log(responseBody);

      if (response.ok) {
        // Traitement réussi
        console.log("Formulaire soumis avec succès");
      } else {
        // Gérer les erreurs
        console.error("Erreur lors de la soumission du formulaire");
      }
    } catch (error) {
      console.error("Erreur réseau", error);
    }
  };

  return (
    <div className={"style.form"}>
      <form onSubmit={handleSubmit}>
        <label>Nom :</label>
        <input
          type="text"
          placeholder="Entrez votre nom"
          value={formData.nom}
          onChange={handleChange}
          name="nom"
        />

        <label> Email :</label>
        <input
          type="email"
          placeholder="Entrez votre email"
          value={formData.email}
          onChange={handleChange}
          name="email"
        />

        <label> Sujet :</label>
        <input
          type="text"
          placeholder="Entrez votre sujet"
          value={formData.subject}
          onChange={handleChange}
          name="subject"
        />

        <label> Message :</label>
        <textarea
          placeholder="Entrez votre message"
          className="max-w-xs"
          value={formData.message}
          onChange={handleChange}
          name="message"
        />
        <button type="submit"> Envoyer</button>
      </form>
    </div>
  );
}
