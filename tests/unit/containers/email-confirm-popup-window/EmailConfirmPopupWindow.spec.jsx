import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import EmailConfirmPopupWindow from '~/containers/email-confirm-popup-window/EmailConfirmPopupWindow'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import { fireEvent } from '@testing-library/dom'
import { vi } from 'vitest'

vi.mock('~/containers/guest-home-page/login-dialog/LoginDialog', () => ({
    __esModule: true,
    default: () => <div data-testid="mock-login-dialog"></div>
}))

describe('EmailConfirmModal test', () => {
    
    let closeModal;
    let openModal;

    beforeEach(() => {
        closeModal = vi.fn();
        openModal = vi.fn();
        renderWithProviders(<EmailConfirmPopupWindow />, { 
            modalContext: { closeModal, openModal }
        })
    })
   
    it('the popup-window should disappear if user clicks close button', async () => {      
        fireEvent.click(screen.getByLabelText('Close'))
    
        assert(() => {
            expect(closeModal).toHaveBeenCalled()
        })
    })

    it('the popup-window should not disappear if user clicks outside the window', async () => {
        fireEvent.click(document.body)
        
        assert(() => {
            expect(closeModal).not.toHaveBeenCalled()
        })
    })

    it('should open mock LoginDialog component when AppButton is clicked and render it', async () => {      
        fireEvent.click(screen.getByTestId('go-to-login-button'))
        
        assert(() => {
            expect(openModal).toHaveBeenCalledWith({ component: <LoginDialog /> })
        })
        expect(screen.getByTestId('mock-login-dialog')).toBeInTheDocument()
    })
})