/**
 * Kings Bakes – Database Seeder
 * Seeds MongoDB with all products from the official price list.
 * Run: node backend/seeder.js
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const products = [
  // ── Royal Icing Cakes ──────────────────────────────────────
  { name: 'Vanilla Royal Icing', price: 400, description: 'Classic vanilla royal icing cake – bringing back the sweet taste of school days. Simple, superb.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Chocolate Royal Icing', price: 400, description: 'Rich chocolate royal icing cake with a smooth glossy finish. A timeless favourite.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Pineapple Royal Icing', price: 400, description: 'Fresh pineapple flavoured royal icing cake – light, fruity and absolutely delightful.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Strawberry Royal Icing', price: 400, description: 'Sweet strawberry royal icing cake with a beautiful pink finish and fruity aroma.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Butterscotch Royal Icing', price: 400, description: 'Buttery caramel butterscotch royal icing cake – a warm, comforting classic flavour.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },

  // ── Classic Flavours ──────────────────────────────────────
  { name: 'White Forest', price: 900, description: 'Delicate white chocolate sponge layered with fresh cream and exotic fruits. A royal classic.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Black Forest', price: 700, description: 'Timeless chocolate sponge with fresh cream and cherries. The all-time crowd favourite.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: true },
  { name: 'Blueberry', price: 900, description: 'Moist sponge loaded with fresh blueberry cream – tangy, sweet and irresistibly good.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Pineapple Classic', price: 700, description: 'Fluffy pineapple cream cake with fresh chunks – a tropical favourite for all occasions.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Kiwi Fresh', price: 700, description: 'Refreshing kiwi flavoured cake with light cream – perfect for a fruity, summer celebration.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Mango', price: 800, description: 'Luscious mango cream cake with fresh pulp – a tropical delight that melts in your mouth.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Butterscotch Classic', price: 800, description: 'Caramel butterscotch cream cake with crunchy toffee bits – a warm, comforting classic.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Choconuts', price: 900, description: 'Chocolate cake studded with crunchy nuts and chocolate drizzle – a nutty choco dream.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Strawberry Classic', price: 800, description: 'Fresh strawberry cream cake with real strawberry pieces – sweet, bright and beautiful.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Caramel Fudge', price: 1000, description: 'Rich caramel fudge cake with gooey caramel layers – indulgent and deeply satisfying.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Rasmalai', price: 1300, description: 'Unique fusion cake inspired by the classic Indian dessert – saffron cream with cardamom notes.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: true },
  { name: 'Choco Vanilla', price: 900, description: 'Perfect blend of chocolate and vanilla cream – a classic combination that never disappoints.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Orange Classic', price: 700, description: 'Zesty orange cream cake – refreshing citrus flavour with a light, fluffy sponge.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Crispy Butterscotch', price: 1000, description: 'Butterscotch cake with extra crispy caramel topping – the perfect crunch in every bite.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Choco Chips', price: 1000, description: 'Chocolate cream cake loaded with premium choco chips throughout – a chocoholic\'s delight.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Black Magic', price: 800, description: 'Intensely dark chocolate cake with rich black cocoa – mysterious, bold and unforgettable.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Choco Velvet', price: 1000, description: 'Smooth velvety chocolate cake with silky ganache finish – luxurious in every layer.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'White Truffle', price: 900, description: 'White chocolate truffle cake with melt-in-mouth ganache – elegant and irresistibly creamy.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Pistachio Classic', price: 1000, description: 'Light green pistachio cream cake with real pistachio crumble – nutty, rich and delicious.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Chocolate Truffle', price: 900, description: 'Classic chocolate truffle cake with velvety ganache layers – a timeless indulgence.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },

  // ── Premium Range ──────────────────────────────────────
  { name: 'Vancho', price: 1000, description: 'Premium vanilla-chocolate fusion with rich cream toppings. An iconic Kings Bakes flavour.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: true },
  { name: 'Red Velvet', price: 900, description: 'Classic red velvet with smooth cream cheese frosting – vibrant, velvety and luxurious.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: true },
  { name: 'Cadburica', price: 1000, description: 'Cadbury chocolate premium cake with rich cream and chocolate shards on top.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Redbee', price: 1000, description: 'Unique red honey-bee inspired premium cake with cream and rich layering.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Death by Chocolate', price: 1000, description: 'Intense chocolate overload with rich cream toppings – for the ultimate chocolate lover.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: true },
  { name: 'Fudge Nuts', price: 1200, description: 'Premium fudge cake loaded with assorted nuts and rich caramel fudge layers.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Nutty Bubbly', price: 1100, description: 'Crunchy nutty cake with bubbly chocolate pearls and premium cream toppings.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Irish Coffee', price: 1000, description: 'Coffee-infused premium cake with a hint of cream – rich, aromatic and sophisticated.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Nestle Cashew', price: 1300, description: 'Premium cream cake topped generously with whole cashews and Nestle chocolate drizzle.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Oreo Magic', price: 1000, description: 'Oreo cookie cream cake with crushed Oreo layers and vanilla cream – pure magic!', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Choco Scotch', price: 1000, description: 'Butterscotch and chocolate premium blend with rich cream – best of both worlds.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Golden Vancho', price: 1400, description: 'Elevated golden vancho with premium toppings – richer, creamier and more luxurious.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Dark Caramel', price: 1400, description: 'Dark chocolate and salted caramel premium fusion – bold, rich and deeply satisfying.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Choco Red', price: 1000, description: 'Chocolate red velvet combination – a unique premium twist on two classic favourites.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Hazelnut Praline', price: 1400, description: 'Smooth hazelnut praline cream cake with roasted hazelnut crumble topping.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Almond Bubbly', price: 1500, description: 'Premium almond cake with crunchy almond flakes and bubbly chocolate pearls on top.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Purple Velvet', price: 1000, description: 'Gorgeous purple velvet cake with vanilla cream – vibrant, elegant and delicious.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Farm Coffee', price: 1100, description: 'Rich farm-style coffee cake with mocha cream and coffee bean garnish.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Rainbow Cassatta', price: 1000, description: 'Colourful rainbow cassata cake with mixed fruit layers – a celebration in every slice.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Choco Bubbly', price: 1000, description: 'Chocolate cake with crispy wafer pearls and rich cream – a fun, bubbly indulgence.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },

  // ── Chef's Signature ──────────────────────────────────────
  { name: 'Mexican Delight', price: 1500, description: 'Exotic Mexican-inspired spiced cake with unique cream – bold, adventurous and unforgettable.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Tender Coconut', price: 1700, description: 'Fresh tender coconut cream cake – delicate, tropical and beautifully refreshing.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Kulfi Star', price: 1400, description: 'Signature cake inspired by the beloved kulfi – saffron, cardamom and pistachio magic.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'German Nuts', price: 1500, description: 'German-inspired nut cake with rich cream and premium mixed nut topping.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Chocobella', price: 1900, description: 'The most luxurious chocolate creation – Nutella, hazelnuts and dark chocolate in one masterpiece.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: true },
  { name: 'Ferraro Rocher', price: 1600, description: 'Hazelnut chocolate signature cake adorned with whole Ferraro chocolates – a showstopper.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: true },
  { name: 'Rafaello', price: 1800, description: 'Coconut almond signature cake inspired by Raffaello chocolates – elegant and exquisite.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Dutch Chocolate', price: 1400, description: 'Rich Dutch cocoa cake with deep chocolate flavour and premium cream frosting.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'German Black', price: 1200, description: 'Classic German black forest elevated with our signature cream and cherry compote.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Lotus Punch', price: 1400, description: 'Lotus Biscoff biscuit cake with caramel cream spread – the internet\'s most loved flavour.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Strawberry Truffle', price: 1100, description: 'Fresh strawberry and truffle ganache fusion – fruity, rich and divinely indulgent.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Nutella Kick', price: 1300, description: 'Nutella-packed signature cake with hazelnut cream – for when you need that extra kick.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Pure Chocolate', price: 1500, description: '100% premium chocolate cake – no distractions, just pure, intense chocolate bliss.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Spanish Delight', price: 1400, description: 'Spanish-inspired cake with rich cream and exotic spiced notes – a royal delight.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Marvel Magic', price: 1000, description: 'A magical blend of flavours that surprises with every bite – the crowd-pleasing signature.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Royal Garden', price: 1500, description: 'Floral-inspired signature cake with exotic fruit and cream layers – fit for royalty.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Kitgems', price: 1500, description: 'Jewel-inspired signature cake with gem-like toppings and rich premium cream.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Mixed Fruit Exotica', price: 1800, description: 'Premium exotic mixed fruit cake with tropical layers – a fruity extravaganza.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Chocolate Silk', price: 1500, description: 'Ultra-smooth silky chocolate cake with satin ganache finish – luxury in every bite.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Tiramisu Regular', price: 1500, description: 'Classic Italian tiramisu-inspired cake with espresso and mascarpone cream layers.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Mont Blanc', price: 1200, description: 'French-inspired chestnut cream cake – sophisticated, nutty and unmistakably elegant.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Wild Chocolate', price: 1400, description: 'Untamed dark chocolate with wild berry compote – bold, intense and adventurous.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Blueberry Truffle', price: 1400, description: 'Fresh blueberry and dark truffle fusion – tangy meets rich in perfect harmony.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Royal Pistachio', price: 1500, description: 'Regal pistachio cream cake with premium pistachio crumble and saffron notes.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Choco Barks', price: 1500, description: 'Artisan chocolate bark cake with crunchy toppings and premium dark chocolate.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Canadian Blueberry', price: 1300, description: 'Premium Canadian blueberry cream cake – intensely fruity with a rich cream base.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },

  // ── Cheese Cakes ──────────────────────────────────────
  { name: 'Lotus Biscoff Cheesecake', price: 1400, description: 'Creamy cheesecake with Lotus Biscoff spread and caramelized biscuit base – addictively good.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: true },
  { name: 'OG New York Cheesecake', price: 1800, description: 'The original dense, velvety New York cheesecake – the gold standard of all cheesecakes.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: true },
  { name: 'Key Lime Cheesecake', price: 1600, description: 'Tangy key lime cheesecake with a buttery graham cracker crust – zesty and refreshing.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Vanilla Bourbon Cheesecake', price: 2000, description: 'Premium vanilla bourbon cheesecake with deep vanilla notes and silky smooth texture.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Tiramisu Cheesecake', price: 1300, description: 'Italian tiramisu-inspired cheesecake with espresso and mascarpone – pure sophistication.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Creme Brulee Cheesecake', price: 1800, description: 'French creme brulée cheesecake with a caramelized sugar crust – torch-finished perfection.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Milo Melt Cheesecake', price: 1600, description: 'Milo chocolate malt cheesecake – nostalgic, rich and creamy in every single bite.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Raspberry Cheesecake', price: 1400, description: 'Tangy raspberry swirl cheesecake with fresh raspberry compote and buttery base.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Pistachio Cheesecake', price: 1300, description: 'Smooth pistachio cream cheesecake with real pistachio crumble and a nutty base.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Lavender Punch Cheesecake', price: 1700, description: 'Floral lavender infused cheesecake with a refreshing purple hue – uniquely beautiful.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Blueberry Cheesecake', price: 1400, description: 'Creamy cheesecake topped with fresh blueberry compote – vibrant, fruity and luscious.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Choco Chips Cheesecake', price: 1400, description: 'Classic cheesecake studded with premium chocolate chips – a choco-cheese dream.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Hazel Nut Cheesecake', price: 1500, description: 'Rich hazelnut praline cheesecake with roasted hazelnuts and Nutella swirl on top.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
  { name: 'Fruit Pebbles Cheesecake', price: 1600, description: 'Colourful fruit pebbles cereal cheesecake – fun, vibrant and incredibly tasty.', category: 'cakes', image: '/uploads/default.jpg', isVeg: true, isAvailable: true, isFeatured: false },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/kingsbakes');
    console.log('MongoDB Connected');

    await Product.deleteMany({});
    console.log('Existing products cleared');

    const created = await Product.insertMany(products);
    console.log(`Seeded ${created.length} products successfully`);

    await mongoose.disconnect();
    console.log('Done. Database seeded!');
  } catch (err) {
    console.error('Seeder error:', err.message);
    process.exit(1);
  }
};

seedDB();
