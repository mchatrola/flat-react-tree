import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import FlatTree from './FlatTree';

describe('FlatTree tests', () => {
    it('should contains the root node', () => {
    render(<FlatTree />);
        const rootNode = screen.queryByTestId(1);
         // screen.debug();
        expect(rootNode).toBeInTheDocument();
    });

    it('should contains the child node', () => {
        render(<FlatTree />);
        expect(screen.getByTestId("1-1")).toBeInTheDocument();
        expect(screen.getByTestId("1-2")).toBeInTheDocument();
        expect(screen.getByTestId("1-1-1")).toBeInTheDocument();
    });

    it('should contains add and remove buttons', () => {
        render(<FlatTree />);
        expect(screen.getByTestId("1-1-add")).toBeInTheDocument();
        expect(screen.getByTestId("1-2-remove")).toBeInTheDocument();
        expect(screen.getByTestId("1-1-1-add")).toBeInTheDocument();
        expect(screen.getByTestId("1-1-2-remove")).toBeInTheDocument();
    });

    it('add new node on click of +', () => {
        render(<FlatTree />);
        fireEvent.click(screen.getByTestId("1-1-add"), { id: '1-1',next: '0', prev: '1', });
        expect(screen.getByTestId("1-1-3")).toBeInTheDocument();
    });

    it('Remove node on click of -', () => {
        render(<FlatTree />);
        fireEvent.click(screen.getByTestId("1-1-2-remove"), { id: '1-1-2',next: '0', prev: '1-1', });
        expect(screen.queryByTestId("1-1-2")).not.toBeInTheDocument();
    });

    it('add new node and remove it', () => {
        render(<FlatTree />);
        fireEvent.click(screen.getByTestId("1-1-add"), { id: '1-1',next: '0', prev: '1', });
        expect(screen.getByTestId("1-1-3")).toBeInTheDocument();
        fireEvent.click(screen.getByTestId("1-1-3-remove"), { id: '1-1-3',next: '0', prev: '1-1', });
        expect(screen.queryByTestId("1-1-3")).not.toBeInTheDocument();
    });

    it('alert when try to remove parent node', () => {
        render(<FlatTree />);
        const alertMock = jest.spyOn(window,'alert').mockImplementation(); 
        fireEvent.click(screen.getByTestId("1-1-remove"), { id: '1-1',next: '1-1-1', prev: '1-1', });
        expect(alertMock).toHaveBeenCalledTimes(1);
        expect(screen.getByTestId("1-1")).toBeInTheDocument();
    });

    it('remove and add new node will add the node at end', () => {
        render(<FlatTree />);
        fireEvent.click(screen.getByTestId("1-1-1-remove"), { id: '1-1-1',next: '0', prev: '1-1', });
        expect(screen.queryByTestId("1-1-1")).not.toBeInTheDocument();
        fireEvent.click(screen.getByTestId("1-1-add"), { id: '1-1',next: '0', prev: '1', });
        expect(screen.getByTestId("1-1-3")).toBeInTheDocument();
    });

});