
import './modal.scss';

interface Props {
  children: React.ReactNode;
  onClose: () => void;
  show: boolean;
}

export function Modal({
  children,
  onClose,
  show
}: Props) {
  return (
    <>
      <div className={`modal ${show ? 'show' : 'hide'}`}>
        <div className="modal-close" onClick={onClose}>
          <button>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_3606_11)">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 22.5C6.201 22.5 1.5 17.7975 1.5 12C1.5 6.2025 6.201 1.5 12 1.5C17.799 1.5 22.5 6.2025 22.5 12C22.5 17.7975 17.799 22.5 12 22.5ZM12 0C5.37225 0 0 5.37 0 12C0 18.63 5.37225 24 12 24C18.6277 24 24 18.63 24 12C24 5.37 18.6277 0 12 0ZM16.2877 7.71002C15.9922 7.41752 15.5145 7.41752 15.219 7.71002L11.9955 10.935L8.8185 7.75497C8.52525 7.46247 8.04975 7.46247 7.758 7.75497C7.46475 8.04747 7.46475 8.52751 7.758 8.82001L10.935 11.9925L7.73552 15.195C7.44077 15.4875 7.44077 15.9675 7.73552 16.2675C8.03102 16.56 8.50949 16.56 8.80499 16.2675L12.0045 13.065L15.1815 16.245C15.4748 16.5375 15.9502 16.5375 16.2427 16.245C16.536 15.9525 16.536 15.4725 16.2427 15.18L13.065 12.0075L16.2877 8.78247C16.5825 8.48247 16.5825 8.01002 16.2877 7.71002Z" fill="black" />
              </g>
              <defs>
                <clipPath id="clip0_3606_11">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
        <div>
        <div>{children}</div>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </>
  );
}