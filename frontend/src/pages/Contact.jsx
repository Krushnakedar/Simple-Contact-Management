const Contact = ({ contact, onClick }) => {
  return (
    <tr style={{ cursor: "pointer" }} onClick={onClick}>
      <td>{contact.name}</td>
      <td>{contact.phone}</td>
    </tr>
  );
};

export default Contact;
