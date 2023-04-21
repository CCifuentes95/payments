CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE account (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE movements (
  id INT NOT NULL AUTO_INCREMENT,
  account_id INT NOT NULL,
  type ENUM('Add', 'Remove') NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  result ENUM('Pending', 'Successful', 'Declined') NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (account_id) REFERENCES account(id)
);


-- Insert dummy users
INSERT INTO user (firstname, lastname, email, password) VALUES
  ('John', 'Doe', 'johndoe@example.com', 'password123'),
  ('Jane', 'Doe', 'janedoe@example.com', 'password456'),
  ('Bob', 'Smith', 'bobsmith@example.com', 'password789');

-- Insert dummy accounts
INSERT INTO account (user_id, total) VALUES
  (1, 5000.00),
  (2, 10000.00),
  (3, 2500.00);

-- Insert dummy movements
INSERT INTO movements (account_id, type, amount, result) VALUES
  (1, 'Add', 6000.00, 'Successful'),
  (1, 'Remove', 1000.00, 'Successful'),
  (2, 'Add', 10000.00, 'Successful'),
  (3, 'Add', 3000.00, 'Successful'),
  (3, 'Remove', 500.00, 'Declined');
