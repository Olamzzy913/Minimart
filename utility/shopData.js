const shopData = [
  {id: 1,
    sellerName: "Mt44r89",
    sellerPic:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
    productImage:
      "https://cdn.pixabay.com/photo/2024/04/12/11/49/ai-generated-8691762_640.png",
    productTitle: "Golden Sneaker",
    productSubTitle:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos sed mollitia iure aliquid cum ipsa. Cum fugiat culpa illo eum quos rem pariatur. Magnam aperiam nulla, accusamus totam maxime animi.",
    productPrice: 250.00,
    category: "collections",
  },
  {id: 2,
    sellerName: "Wt94r89",
    sellerPic:
      "https://cdn.pixabay.com/photo/2023/02/01/19/15/woman-7761133_640.jpg",
    productImage:
      "https://cdn.pixabay.com/photo/2016/02/05/19/34/isolated-1181845_640.png",
    productTitle: "Celle Jacket",
    productSubTitle:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos sed mollitia iure aliquid cum ipsa. Cum fugiat culpa illo eum quos rem pariatur. Magnam aperiam nulla, accusamus totam maxime animi.",
    productPrice: 150.00,
    category: "collections",
  },
  {id: 4,
    sellerName: "Pt94r89",
    sellerPic:
      "https://www.istockphoto.com/photo/chicken-fried-rice-gm945606006-258268990?utm_source=pixabay&utm_medium=affiliate&utm_campaign=SRP_photo_sponsored&utm_content=https%3A%2F%2Fpixabay.com%2Fphotos%2Fsearch%2Ffried%2520rice%2520and%2520chicken%2F&utm_term=fried+rice+chicken",
    productImage:
      "https://cdn.pixabay.com/photo/2018/09/12/09/02/asia-3671604_640.png",
    productTitle: "Fried Rice",
    productSubTitle:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos sed mollitia iure aliquid cum ipsa. Cum fugiat culpa illo eum quos rem pariatur. Magnam aperiam nulla, accusamus totam maxime animi.",
    productPrice: 105.00,
    category: "foods",
  },
  {id: 4,
    sellerName: "Pt94r89",
    sellerPic:
      "https://cdn.pixabay.com/photo/2019/12/09/11/53/burger-4683373_640.jpg",
    productImage:
      "https://cdn.pixabay.com/photo/2017/07/20/18/27/cheeseburger-2523202_640.png",
    productTitle: "Burger",
    productSubTitle:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos sed mollitia iure aliquid cum ipsa. Cum fugiat culpa illo eum quos rem pariatur. Magnam aperiam nulla, accusamus totam maxime animi.",
    productPrice: 95.00,
    category: "foods",
  },
  {id: 5,
    sellerName: "Kt44r89",
    sellerPic:
      "https://images.unsplash.com/photo-1593504049359-74330189a345?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGl6emF8ZW58MHx8MHx8fDA%3D",
    productImage:
      "https://cdn.pixabay.com/photo/2017/12/05/20/10/pizza-3000285_640.png",
    productTitle: "Pizza",
    productSubTitle:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos sed mollitia iure aliquid cum ipsa. Cum fugiat culpa illo eum quos rem pariatur. Magnam aperiam nulla, accusamus totam maxime animi.",
    productPrice: 350.00,
    category: "foods",
  },
  {id: 6,
    sellerName: "Rt40r89",
    sellerPic:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
    productImage:
      "https://cdn.pixabay.com/photo/2018/04/04/00/23/kettle-3288479_640.png",
    productTitle: "Electric Kettle",
    productSubTitle:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos sed mollitia iure aliquid cum ipsa. Cum fugiat culpa illo eum quos rem pariatur. Magnam aperiam nulla, accusamus totam maxime animi.",
    productPrice: 410.00,
    category: "utensils",
  },
  {id: 7,
    sellerName: "Mt44r89",
    sellerPic:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
    productImage:
      "https://cdn.pixabay.com/photo/2018/03/02/09/19/flower-marigolds-3192686_640.png",
    productTitle: "Pelric fl",
    productSubTitle:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos sed mollitia iure aliquid cum ipsa. Cum fugiat culpa illo eum quos rem pariatur. Magnam aperiam nulla, accusamus totam maxime animi.",
    productPrice: 80.00,
    category: "skin care",
  },
  {id: 8,
    sellerName: "Mt44r89",
    sellerPic:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
    productImage:
      "https://cdn.pixabay.com/photo/2017/07/08/10/44/parcels-2484036_640.png",
    productTitle: "Package Delivery",
    productSubTitle:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos sed mollitia iure aliquid cum ipsa. Cum fugiat culpa illo eum quos rem pariatur. Magnam aperiam nulla, accusamus totam maxime animi.",
    productPrice: `${50.00} per week`,
    category: "services",
  },
  {id: 9,
    sellerName: "Mt44r89",
    sellerPic:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
    productImage:
      "https://cdn.pixabay.com/photo/2017/12/15/18/50/isolated-3021541_640.png",
    productTitle: "Men Suit",
    productSubTitle:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos sed mollitia iure aliquid cum ipsa. Cum fugiat culpa illo eum quos rem pariatur. Magnam aperiam nulla, accusamus totam maxime animi.",
    productPrice: 950.00,
    category: "collections",
  },

  {id: 10,
    sellerName: "Rt40r89",
    sellerPic:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
    productImage:
      "https://i.pinimg.com/236x/fd/4b/63/fd4b63b8e014f6f893a848f29a453167.jpg",
    productTitle: "Toster Oven",
    productSubTitle:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos sed mollitia iure aliquid cum ipsa. Cum fugiat culpa illo eum quos rem pariatur. Magnam aperiam nulla, accusamus totam maxime animi.",
    productPrice: 200.00,
    category: "utensils",
  },
  {id: 11,
    sellerName: "Mt44r89",
    sellerPic:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
    productImage:
      "https://cdn.pixabay.com/photo/2016/11/26/13/16/shampoo-1860642_640.png",
    productTitle: "Onia",
    productSubTitle:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos sed mollitia iure aliquid cum ipsa. Cum fugiat culpa illo eum quos rem pariatur. Magnam aperiam nulla, accusamus totam maxime animi.",
    productPrice: 80.00,
    category: "skin care",
  },
  {id: 12,
    sellerName: "Mt44r89",
    sellerPic:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
    productImage:
      "https://cdn.pixabay.com/photo/2018/02/08/04/10/isolated-3138642_640.png",
    productTitle: "Domestic cleaning",
    productSubTitle:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos sed mollitia iure aliquid cum ipsa. Cum fugiat culpa illo eum quos rem pariatur. Magnam aperiam nulla, accusamus totam maxime animi.",
    productPrice: `${50.00} per week`,
    category: "services",
  },
  {id: 13,
    sellerName: "Rt40r89",
    sellerPic:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
    productImage:
      "https://cdn.pixabay.com/photo/2018/11/02/07/13/audio-3789704_640.jpg",
    productTitle: "Split AC",
    productSubTitle:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos sed mollitia iure aliquid cum ipsa. Cum fugiat culpa illo eum quos rem pariatur. Magnam aperiam nulla, accusamus totam maxime animi.",
    productPrice: 410.00, 
    category: "utensils",
  },
];

export default shopData;
