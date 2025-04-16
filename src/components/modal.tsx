import { ReactNode } from "react";
import { createPortal } from "react-dom";

export interface ModalProps {
  children: ReactNode
  onClose: () => void
}


export default function Modal({ children, onClose }: ModalProps) {

  return <>
    {

      createPortal(

        <div className=" overflow-y-auto overflow-x-hidden   fixed  flex h-full left-0 right-0  z-[999]  justify-center items-center w-full backdrop-blur-sm  md:inset-0  ">
          <div className="border  z-99 bg-white border-black  p-20 rounded-2xl" >

            <div className=""  >
              <div className="relative top-0 right-0 flex justify-end">

                <button onClick={onClose} type="button" className="rounded-b-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  X
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div id="modal-content">
                {children}
              </div>
            </div>

          </div>
        </div>

        , document.body

      )}
  </>
}


