public class Binary_Search_Tree {
    public static class Node {
    int val;
    Node left;
    Node right;

    public Node(int val) {
        this.val = val;
    }
}

    public Node root;
    public Binary_Search_Tree(int[] in) {
        root=CreateTree(in,0,in.length-1);
    }
    public Node CreateTree(int []in,int si,int ei) {
        if (si > ei) {
            return null;
        }
        int mid= (si+ei)/2;
        Node nn = new Node(in[mid]);
        nn.left = CreateTree(in, si, mid-1);
        nn.right = CreateTree(in, mid+1, ei);

        return nn;
    }





    public void PreOrder() {
		PreOrder(this.root);
		System.out.println();
	}

	private void PreOrder(Node node) {
		if (node == null) {
			return;
		}

		System.out.print(node.val + " ");
		PreOrder(node.left);
		PreOrder(node.right);

	}

    public void InOrder() {
		InOrder(this.root);
		System.out.println();
	}

	private void InOrder(Node node) {
		if (node == null) {
			return;
		}

		InOrder(node.left);
		System.out.print(node.val + " ");
		InOrder(node.right);

	}
    public static void main(String[] args) {
        int[] in ={10,20,30,40,50,60,70,80};
        Binary_Search_Tree bst = new Binary_Search_Tree(in);
        bst.InOrder();
    }
}



// All BST ARE BINARY Tree

// if a BT -> IN ORDER ->SORTED -> IT IS BST

// left ke max se root ka data bada hoga
// right ke min se root ka data chota hoga
// for every root 


// Skiwed Tree
// 10
    // -20
        // -30
            // -40
                // -50
                    // -60
                        // -70