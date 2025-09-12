import { Link } from 'react-router-dom';
import Picture from '../../../Picture';

const UserHead = ({ user, handleUserClick }) => {
    return (
        <Link to={`/room/${user._id}`}>
            <div
                onClick={() => handleUserClick(user)}
                className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 cursor-pointer"
                >
                <Picture size={40} user={user} />
                <span>
                    {user.firstName} {user.lastName}
                </span>
            </div>
        </Link>
    );
};

export default UserHead;