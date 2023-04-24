import Modal from 'react-ts-modal';
import 'react-ts-modal/css/styles.scss';
import { Contact } from '../types';

export function ContactCard(props: Contact) {
  const { createdAt, email, phone, birthday, name, avatar, id } = props;
  return (
    <div data-testid={`contact-modal-${id}`}>
      <h2>{name}</h2>
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>
      <p>Birthday: {new Date(birthday).toLocaleDateString()}</p>
      <p>Created At:{new Date(createdAt).toLocaleDateString()}</p>
      <img src={avatar} className="avatar" alt={name} />
    </div>
  );
}

export default ContactCard;
