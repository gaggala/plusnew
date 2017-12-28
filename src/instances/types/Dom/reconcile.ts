import DomInstance from './Instance';
import PlusnewAbstractElement from '../../../PlusnewAbstractElement';
import reconciler from '../../reconciler';

export default function (newAbstractElement: PlusnewAbstractElement, instance: DomInstance) {
  for (const propIndex in newAbstractElement.props) {
    if (propIndex === 'children') {
      for (let i = 0; i < newAbstractElement.props.children.length; i += 1) {
        const newInstance = reconciler.update(newAbstractElement.props.children[i], instance.children[i]);
        if (newInstance !== instance.children[i]) {
          instance.children[i].remove();
          instance.children[i] = newInstance;
        }
      }
    } else if (propIndex !== 'children') { // @TODO add special-values to a specific place
      if (instance.abstractElement.props[propIndex] !== newAbstractElement.props[propIndex]) {
        instance.setProp(propIndex, newAbstractElement.props[propIndex]);
      }
    }
  }

  instance.abstractElement = newAbstractElement; // updating the shadowdom
}
