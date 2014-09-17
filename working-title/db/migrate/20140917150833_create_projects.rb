class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :name
      t.belongs_to :category
      t.belongs_to :initiator

      t.timestamps
    end
  end
end
