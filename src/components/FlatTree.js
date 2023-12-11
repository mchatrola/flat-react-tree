import React, { useEffect, useState } from 'react';

const data = [
    {
        id: '1',
        next: '1-1',
        prev: '0',
    },
    {
        id: '1-1',
        next: '1-1-1',
        prev: '1',
    },
    {
        id: '1-2',
        next: '1-2-1',
        prev: '1',
    },
    {
        id: '1-1-1',
        next: '0',
        prev: '1-1',
    },
    {
        id: '1-1-2',
        next: '0',
        prev: '1-1',
    },
    {
        id: '1-2-1',
        next: '0',
        prev: '1-2',
    }

];

export default function FlatTree() {
    const [firstNode, setFirstNode] = useState({});
    const [treeData, setTreeData] = useState(data);

    useEffect(() => {
        const initialData = data.filter(e => e.prev === '0');
        setFirstNode(initialData[0]);
    },[]);

    const addNode = (currentNode) => {
        const siblingNodes = treeData.filter(e => e.prev === currentNode.id);
        let n = siblingNodes.length+1;
        if (siblingNodes.length > 0) {
            const lastNodeId = siblingNodes[siblingNodes.length-1].id;
            const last = lastNodeId.substring(lastNodeId.lastIndexOf('-')+1, lastNodeId.length);
            n = Number(last)+1;
        }
        
        const newNode = {
            id: `${currentNode.id}-${n}`,
            prev: currentNode.id,
            next: 0,
        }

        if (currentNode.next === '0') {
            const newData =  treeData.filter(e => e.id !== currentNode.id);
            currentNode.next = `${currentNode.id}-${n}`;
            newData.push(currentNode);
            newData.push(newNode);
            setTreeData(newData);
        } else {
            setTreeData([...treeData, newNode]);
        }
    }

    const removeNode = (currentNode) => {
        if (currentNode.next === 0 || currentNode.next === '0') {
            const newData =  treeData.filter(e => e.id !== currentNode.id);
            setTreeData(newData);
        } else {
            const childNodes = treeData.filter(e => e.prev === currentNode.id);
            if (childNodes.length > 0) {
                alert('You can not delete a folder which has children');
            } else {
                const newData =  treeData.filter(e => e.id !== currentNode.id);
                setTreeData(newData);
            }
        }
    }

    const TreeNode = ({prev}) => {
        const nodeData = treeData.filter(e => e.prev === prev);
        return (
            nodeData.map((node) => {
                const n = node.id.length*3;
                return(
                    <>
                        <div style={{ display: 'flex' }}>
                            <div key={node.id} style={{ marginLeft: `${n}px`, marginRight: '15px' }} data-testid={node.id}>📂 {node.id}</div>
                            <button data-testid={`${node.id}-add`} onClick={() => addNode(node)}>+</button>
                            <button data-testid={`${node.id}-remove`} onClick={() => removeNode(node)}>-</button>
                        </div>
                        <TreeNode prev={node.id} />
                    </>
                
                )
            })
        )
    }

    return(
        <div style={{ marginTop: '5px',marginBottom: '5px', marginLeft: '20px' }}>
            <TreeNode prev={firstNode.prev} />
        </div>
    );
}