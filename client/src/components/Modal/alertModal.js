import swal from 'sweetalert';
import history from '../../helpers/history';

const showDeleteModal = () => {
  swal({
    title: 'Are you sure?',
    text: 'Once deleted, you will not be able to recover this imaginary file!',
    icon: 'warning',
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        swal('Poof! Your imaginary file has been deleted!', {
          icon: 'success',
        });
        history.push('/');
      } else {
        swal('Your imaginary file is safe!');
      }
    });
};
export default showDeleteModal;

// <div
//   className="modal"
//   id="confirmationModal/:id">
//   <div className="modal-dialog" role="document">
//     <div className="modal-content">
//       <div className="modal-header bg-red">
//         <h5 className="modal-title text-light text-center"
//           id="exampleModalLabel">Sign in
//         </h5>
//         <button type="button"
//           className="close"
//           data-dismiss="modal"
//           aria-label="Close">
//           <span className="text-white" aria-hidden="true">&times;</span>
//         </button>
//       </div>
//       <div className="p-3">
//         <p
//           className="text-center text-dark">
//             You are about to delete this. Do you wish to continue?
//         </p>
//       </div>
//       <div className="modal-footer">
//         <button
//           className="marg rounded btn btn-outline-danger ml-2 border" >
//             Submit
//         </button>
//       </div>
//     </div>
//   </div>
// </div>
